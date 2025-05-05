// app/api/questions/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';

// Get a single question by ID
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    
    // Try to find by MongoDB ObjectId first
    let question;
    
    // Check if id is a valid number for questionNumber lookup
    if (!isNaN(id)) {
      question = await Question.findOne({ questionNumber: parseInt(id) });
    }
    
    // If not found by questionNumber, try ObjectId (if it's a valid format)
    if (!question && id.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        question = await Question.findById(id);
      } catch (err) {
        console.log('Not a valid ObjectId:', err);
      }
    }
    
    if (!question) {
      return NextResponse.json({
        success: false,
        error: 'Question not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      question
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch question',
      details: error.message
    }, { status: 500 });
  }
}

// Update a question by ID
export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const updateData = await request.json();
    
    // Remove fields that should not be updated
    delete updateData._id;
    delete updateData.questionNumber;
    delete updateData.createdAt;
    
    let question;
    
    // Try to update by questionNumber if id is a number
    if (!isNaN(id)) {
      question = await Question.findOneAndUpdate(
        { questionNumber: parseInt(id) },
        updateData,
        { new: true }
      );
    }
    
    // If not found by questionNumber, try ObjectId
    if (!question && id.match(/^[0-9a-fA-F]{24}$/)) {
      question = await Question.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
    }
    
    if (!question) {
      return NextResponse.json({
        success: false,
        error: 'Question not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      question
    });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update question',
      details: error.message
    }, { status: 500 });
  }
}

// Delete a question by ID
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    let deletedQuestion;
    
    // Try to delete by questionNumber if id is a number
    if (!isNaN(id)) {
      deletedQuestion = await Question.findOneAndDelete({ questionNumber: parseInt(id) });
    }
    
    // If not found by questionNumber, try ObjectId
    if (!deletedQuestion && id.match(/^[0-9a-fA-F]{24}$/)) {
      deletedQuestion = await Question.findByIdAndDelete(id);
    }
    
    if (!deletedQuestion) {
      return NextResponse.json({
        success: false,
        error: 'Question not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete question',
      details: error.message
    }, { status: 500 });
  }
}