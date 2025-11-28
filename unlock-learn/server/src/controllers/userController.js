// controllers/userControllers.js
import User from '../models/User.js';
import { BaseController } from './baseController.js';

class UserController extends BaseController {
  constructor() {
    super(User);
  }

  // Custom method: Get user profile (without sensitive info)
  getProfile = async (req, res) => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  // Custom method: Update user profile
  updateProfile = async (req, res) => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      // Prevent password updates through this route
      const { password, ...updateData } = req.body;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');

      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
}

export default new UserController();
