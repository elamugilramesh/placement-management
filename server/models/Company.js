import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  materials: [{
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String, // URL of the uploaded file
      required: false, // This can be empty before the file is uploaded
    },
    uploadedAt: {
      type: Date, // Timestamp when the file was uploaded
      default: null,
    },
    uploadedBy: {
      type: String, // User ID or username of the uploader
      required: false,
    },
  }],
}, { timestamps: true });

export default mongoose.model('Company', companySchema);
