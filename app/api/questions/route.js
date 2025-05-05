// app/api/questions/route.js

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const topic = searchParams.get('topic') || '';
    
    // Build query
    const query = {};
    
    if (search) {
      query.originalQuestion = { $regex: search, $options: 'i' };
    }
    
    if (difficulty) {
      query.difficulty = difficulty.toLowerCase();
    }
    
    if (topic) {
      query.topics = { $in: [new RegExp(topic, 'i')] };
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const questions = await Question.find(query)
      .sort({ questionNumber: -1 })
      .skip(skip)
      .limit(limit)
      .select('_id questionNumber originalQuestion difficulty topics companies simplifiedExplanation createdAt');
    
    // Get total count for pagination
    const total = await Question.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      questions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions', details: error.message },
      { status: 500 }
    );
  }
}