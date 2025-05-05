// models/Question.js


import mongoose from 'mongoose';

// Define the schema for the Question model
const QuestionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    required: true,
    unique: true
  },
  originalQuestion: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  topics: {
    type: [String],
    default: []
  },
  companies: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    default: ''
  },
  simplifiedExplanation: {
    type: String,
    required: true
  },
  examples: {
    type: [{
      input: String,
      output: String,
      explanation: String
    }],
    default: []
  },
  solutions: {
    type: [String],
    default: []
  },
  hint: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

export default Question;