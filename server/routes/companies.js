import express from 'express';
import { auth, adminAuth } from '../middleware/auth.js';
import upload from '../middleware/multerConfig.js';
import Company from '../models/Company.js';

const router = express.Router();

// Get all companies
router.get('/', auth, async (req, res) => {
  try {
    const companies = await Company.find().select('name description logo');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get company by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create company (admin only)
router.post('/', [auth, adminAuth], async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update company (admin only)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete company (admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload study materials for a company
router.post('/:id/materials/upload', [auth, adminAuth], upload.single('file'), async (req, res) => {
  try {
    // Find the company
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Access uploaded file details
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Optionally, save file metadata in the company record
    // For example, adding the uploaded file's path to the company's study materials array
    company.studyMaterials = company.studyMaterials || [];
    company.studyMaterials.push({
      title: req.body.title || uploadedFile.originalname,
      path: uploadedFile.path,
      type: uploadedFile.mimetype,
    });
    await company.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      fileDetails: uploadedFile,
    });
  } catch (error) {
    console.error('File upload error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
