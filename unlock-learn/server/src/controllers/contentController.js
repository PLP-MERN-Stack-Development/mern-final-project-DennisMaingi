// controllers/contentController.js
import Content from '.../models/Content.js';
import BaseController from './baseController.js';

class ContentController extends BaseController {
  constructor() {
    super(Content);
  }

  // Example: override create method to add custom logic
  async create(req, res) {
    try {
      // Add any custom logic here, e.g., set author automatically
      if (!req.body.author && req.user) {
        req.body.author = req.user._id;
      }

      const content = await this.model.create(req.body);
      res.status(201).json(content);
    } catch (error) {
      console.error('Error creating content:', error);
      res.status(500).json({ message: 'Failed to create content', error: error.message });
    }
  }

  // Example: override update method if needed
  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await this.model.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error updating content:', error);
      res.status(500).json({ message: 'Failed to update content', error: error.message });
    }
  }

  // Example: get all contents
  async getAll(req, res) {
    try {
      const contents = await this.model.find().sort({ createdAt: -1 });
      res.json(contents);
    } catch (error) {
      console.error('Error fetching contents:', error);
      res.status(500).json({ message: 'Failed to fetch contents', error: error.message });
    }
  }

  // Example: get one content by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const content = await this.model.findById(id);
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.json(content);
    } catch (error) {
      console.error('Error fetching content:', error);
      res.status(500).json({ message: 'Failed to fetch content', error: error.message });
    }
  }

  // Example: delete content
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.model.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.json({ message: 'Content deleted successfully' });
    } catch (error) {
      console.error('Error deleting content:', error);
      res.status(500).json({ message: 'Failed to delete content', error: error.message });
    }
  }
}

export default new ContentController();
