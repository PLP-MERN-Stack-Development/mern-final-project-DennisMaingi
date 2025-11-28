import api from './api.js';

export const aiService = {
  // Send message to AI chatbot
  async sendMessage(messages, conversationId = 'default') {
    try {
      const response = await api.post('/ai/chat', {
        messages,
        conversationId
      });
      return response.data;
    } catch (error) {
      console.error('AI chat error:', error);
      throw error;
    }
  },

  // Get chat history
  async getChatHistory(conversationId) {
    try {
      const response = await api.get(`/ai/chat/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Get chat history error:', error);
      throw error;
    }
  },

  // Get all conversations
  async getConversations() {
    try {
      const response = await api.get('/ai/conversations');
      return response.data;
    } catch (error) {
      console.error('Get conversations error:', error);
      throw error;
    }
  }
};

export default aiService;