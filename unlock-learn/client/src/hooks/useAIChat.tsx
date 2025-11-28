import { useState, useCallback, useEffect } from 'react';
import { useSocket } from './useSocket.js';
import aiService from '@/services/aiService.js';

export const useAIChat = (conversationId = 'default') => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const socket = useSocket();

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, [conversationId]);

  // Listen for realtime AI responses
  useEffect(() => {
    if (!socket) return;

    const handleAIResponse = (data) => {
      if (data.conversationId === conversationId) {
        setMessages(prev => [...prev, data.message]);
      }
    };

    socket.on('ai_response', handleAIResponse);

    return () => {
      socket.off('ai_response', handleAIResponse);
    };
  }, [socket, conversationId]);

  const loadChatHistory = async () => {
    try {
      const response = await aiService.getChatHistory(conversationId);
      setMessages(response.messages || []);
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const allMessages = [
        ...messages.map(msg => ({ role: msg.isAI ? 'assistant' : 'user', content: msg.content })),
        { role: 'user', content }
      ];

      await aiService.sendMessage(allMessages, conversationId);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
      console.error('Send message error:', err);
    } finally {
      setLoading(false);
    }
  }, [messages, conversationId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearError,
    reloadHistory: loadChatHistory
  };
};