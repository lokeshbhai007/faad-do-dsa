// app/api/analyze/route.js
import { NextResponse } from 'next/server';
import { analyzeQuestion } from '@/lib/gemini';
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    const { question } = await request.json();
    
    if (!question || question.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Question is required' },
        { status: 400 }
      );
    }
    
    // Analyze the question using Gemini AI
    const analysis = await analyzeQuestion(question);
    
    try {
      // Find the highest question number
      const lastQuestion = await Question.findOne({}, {}, { sort: { 'questionNumber': -1 } });
      const nextQuestionNumber = lastQuestion ? lastQuestion.questionNumber + 1 : 1;
      
      // Create a new question with all the analyzed data
      const newQuestion = new Question({
        questionNumber: nextQuestionNumber,
        originalQuestion: question,
        difficulty: analysis.difficulty,
        topics: analysis.topics,
        companies: analysis.companies,
        description: analysis.description,
        simplifiedExplanation: analysis.simplifiedExplanation,
        examples: analysis.examples,
        approaches: analysis.approaches,
        solutions: analysis.solutions, // solutions can now be any type
        hint: analysis.hint,
        similarQuestions: analysis.similarQuestions // Add the similar questions
      });
      
      const savedQuestion = await newQuestion.save();
      
      // Return a properly formatted JSON response
      return NextResponse.json({
        success: true,
        question: savedQuestion
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({
        success: false,
        error: 'Database operation failed',
        details: dbError.message
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to analyze question',
      details: error.message
    }, { status: 500 });
  }
}

// Add an endpoint to get all questions
export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Get all questions sorted by question number
    const questions = await Question.find().sort({ questionNumber: 1 });
    
    return NextResponse.json({
      success: true,
      questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch questions',
      details: error.message
    }, { status: 500 });
  }
}