import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ReviewQuestion from '@/models/ReviewQuestion';

// Initialize database connection
const initDb = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Database connection failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// GET handler - fetch all review questions
export async function GET() {
  const dbError = await initDb();
  if (dbError) return dbError;

  try {
    const reviewQuestions = await ReviewQuestion.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: reviewQuestions });
  } catch (error) {
    console.error('Error fetching review questions:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching review questions', error: error.message },
      { status: 500 }
    );
  }
}

// POST handler - create a new review question
export async function POST(request) {
  const dbError = await initDb();
  if (dbError) return dbError;

  try {
    const body = await request.json();
    const { questionNo, questionName, solvingPlatform, platformQsnNo, note } = body;
    
    // Validate required fields
    if (!questionNo) {
      return NextResponse.json(
        { success: false, message: 'Question number is required' },
        { status: 400 }
      );
    }
    
    // Create new review question
    const reviewQuestion = new ReviewQuestion({
      questionNo,
      questionName: questionName || '',
      solvingPlatform: solvingPlatform || '',
      platformQsnNo: platformQsnNo || '',
      note: note || '',
      reviewed: false // Default value
    });
    
    // Save to database
    await reviewQuestion.save();
    
    return NextResponse.json(
      { success: true, data: reviewQuestion },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review question:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating review question', error: error.message },
      { status: 500 }
    );
  }
}

// PUT handler - update an existing review question
export async function PUT(request) {
  const dbError = await initDb();
  if (dbError) return dbError;

  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Question ID is required' },
        { status: 400 }
      );
    }
    
    const updatedQuestion = await ReviewQuestion.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedQuestion) {
      return NextResponse.json(
        { success: false, message: 'Review question not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedQuestion });
  } catch (error) {
    console.error('Error updating review question:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating review question', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE handler for review questions
export async function DELETE(request) {
  const dbError = await initDb();
  if (dbError) return dbError;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Question ID is required' },
        { status: 400 }
      );
    }
    
    const deletedQuestion = await ReviewQuestion.findByIdAndDelete(id);
    
    if (!deletedQuestion) {
      return NextResponse.json(
        { success: false, message: 'Review question not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting review question:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting review question', error: error.message },
      { status: 500 }
    );
  }
}