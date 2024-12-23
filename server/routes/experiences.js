import express from 'express';
import { auth } from '../middleware/auth.js';
import Experience from '../models/Experience.js';

const router = express.Router();

// Get all experiences
router.get('/', auth, async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate('company', 'name')
      .populate('author', 'name')
      .sort('-createdAt');
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get experiences by company
router.get('/company/:companyId', auth, async (req, res) => {
  try {
    const experiences = await Experience.find({ company: req.params.companyId })
      .populate('author', 'name')
      .sort('-createdAt');
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create experience
router.post('/', auth, async (req, res) => {
  try {
    const experience = await Experience.create({
      ...req.body,
      author: req.user.id
    });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update experience
router.put('/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findOne({
      _id: req.params.id,
      author: req.user.id
    });
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    Object.assign(experience, req.body);
    await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete experience
router.delete('/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id
    });
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;