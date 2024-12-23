import express from 'express';
import { auth, adminAuth } from '../middleware/auth.js';
import Trend from '../models/Trend.js';

const router = express.Router();

// Get all trends
router.get('/', auth, async (req, res) => {
  try {
    const trends = await Trend.find()
      .populate('companies.company', 'name')
      .sort('-year');
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create trend (admin only)
router.post('/', [auth, adminAuth], async (req, res) => {
  try {
    const trend = await Trend.create(req.body);
    res.status(201).json(trend);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update trend (admin only)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const trend = await Trend.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!trend) {
      return res.status(404).json({ message: 'Trend not found' });
    }
    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete trend (admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const trend = await Trend.findByIdAndDelete(req.params.id);
    if (!trend) {
      return res.status(404).json({ message: 'Trend not found' });
    }
    res.json({ message: 'Trend deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;