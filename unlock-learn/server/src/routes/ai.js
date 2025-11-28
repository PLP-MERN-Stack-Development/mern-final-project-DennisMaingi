// routes/ai.js
import express from 'express';
import fetch from 'node-fetch';
import { protect } from '../middleware/protect.js';
import Message from '../models/Message.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompt for AI
const systemPrompt = `You are a helpful educational assistant for InclusiveLearn, an online learning platform. 
You help students with:
- Course recommendations
- Learning paths
- Technical support
- Platform usage guidance
- General questions
- Study tips

Be friendly and concise.`;

// -------------------------------
// POST /api/ai/chat
// -------------------------------
router.post('/chat', protect, async (req, res) => {
  try {
    const { messages, conversationId } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required and cannot be empty' });
    }

    const conversation = conversationId || uuidv4();
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;

    if (!LOVABLE_API_KEY) {
      return res.status(500).json({ error: 'LOVABLE_API_KEY is not configured' });
    }

    const userMessage = messages[messages.length - 1].content || 'Empty message';
    await Message.create({
      user: userId,
      content: userMessage,
      isAI: false,
      conversationId: conversation,
      type: 'text',
    });

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('AI gateway error:', response.status, errText);

      if (response.status === 429) return res.status(429).json({ error: 'Rate limit exceeded' });
      if (response.status === 402) return res.status(402).json({ error: 'AI service unavailable' });

      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const reply = (data?.choices?.[0]?.message?.content || 'AI returned no message').trim();

    const aiMessage = await Message.create({
      user: userId,
      content: reply,
      isAI: true,
      conversationId: conversation,
      type: 'text',
    });

    const io = req.app.get('io');
    if (io) {
      io.to(`user_${userId}`).emit('ai_response', {
        message: aiMessage,
        conversationId: conversation,
      });
    }

    res.set({ ...corsHeaders, 'Content-Type': 'application/json' }).json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

// -------------------------------
// GET /api/ai/chat/:conversationId
// -------------------------------
router.get('/chat/:conversationId', protect, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const messages = await Message.find({ conversationId, user: userId })
      .sort({ createdAt: 1 })
      .select('content isAI createdAt type');

    res.json({ messages });
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

// -------------------------------
// GET /api/ai/conversations
// -------------------------------
router.get('/conversations', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Message.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $last: '$$ROOT' },
          messageCount: { $sum: 1 },
          lastActivity: { $max: '$createdAt' },
        },
      },
      { $sort: { lastActivity: -1 } },
      {
        $project: {
          conversationId: '$_id',
          lastMessage: '$lastMessage.content',
          isAI: '$lastMessage.isAI',
          messageCount: 1,
          lastActivity: 1,
        },
      },
    ]);

    res.json({ conversations });
  } catch (error) {
    console.error('Conversations error:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

export default router;
