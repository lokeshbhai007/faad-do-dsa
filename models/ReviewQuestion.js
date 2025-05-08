import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewQuestionSchema = new Schema({
  questionNo: {
    type: Number,
    required: [true, 'Question number is required'],
    index: true // Add index for faster querying by question number
  },
  questionName: {
    type: String,
    default: '',
    trim: true // Trim whitespace from beginning and end
  },
  solvingPlatform: {
    type: String,
    default: '',
    trim: true
  },
  platformQsnNo: {
    type: String,
    default: '',
    trim: true
  },
  note: {
    type: String,
    required: [true, 'Note is required'],
    trim: true
  },
  reviewed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true // Once set, can't be modified
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Add indexes for common query patterns
ReviewQuestionSchema.index({ reviewed: 1 });
ReviewQuestionSchema.index({ solvingPlatform: 1 });

// Create the model if it doesn't exist already
const ReviewQuestion = mongoose.models.ReviewQuestion || mongoose.model('ReviewQuestion', ReviewQuestionSchema);

export default ReviewQuestion;