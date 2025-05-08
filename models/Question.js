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
    default: 'medium'
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
    default: ''
  },
  examples: {
    type: [{
      input: String,
      output: String,
      explanation: String
    }],
    default: []
  },
  approaches: {
    type: [{
      name: String,
      timeComplexity: String,
      spaceComplexity: String,
      explanation: String,
      properDescribe: String,
      code: String
    }],
    default: []
  },
  // Change the solutions field to use mongoose.Schema.Types.Mixed
  solutions: {
    type: mongoose.Schema.Types.Mixed,
    default: []
  },
  hint: {
    type: String,
    default: ''
  },
  // Add the similarQuestions field
  similarQuestions: {
    type: [{
      title: String,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard', ''],
        default: ''
      },
      description: String
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

export default Question;