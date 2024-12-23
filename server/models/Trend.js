import mongoose from 'mongoose';

const trendSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  companies: [{
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    visited: Boolean,
    hired: Number,
  }],
}, { timestamps: true });

export default mongoose.model('Trend', trendSchema);