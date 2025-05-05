// app/api/analyze/route.js
// Analyze the question using Gemini AI   

import { NextResponse } from 'next/server';
import { analyzeQuestion } from '@/lib/gemini';
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';

export async function POST(request) {
  try {
    // Connect to MongoDB first
    await connectToDatabase();

    const { question } = await request.json();

    if (!question || question.trim() === '') {
      return NextResponse.json(
        { error: 'Question is required' }, 
        { status: 400 }
      );
    }

    // Analyze the question using Gemini AI
    const analysis = await analyzeQuestion(question);

    try {
      // Find the highest question number
      const lastQuestion = await Question.findOne({}, {}, { sort: { 'questionNumber': -1 } });
      const nextQuestionNumber = lastQuestion ? lastQuestion.questionNumber + 1 : 1;
      
      // Create a new question with the questionNumber explicitly set
      const newQuestion = new Question({
        questionNumber: nextQuestionNumber,
        originalQuestion: question,
        simplifiedExplanation: analysis.simplifiedExplanation,
        examples: analysis.examples,
        hint: analysis.hint
      });
      
      const savedQuestion = await newQuestion.save();
      
      return NextResponse.json({ 
        success: true, 
        question: savedQuestion 
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database operation failed', details: dbError.message }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze question', details: error.message },
      { status: 500 }
    );
  }
}