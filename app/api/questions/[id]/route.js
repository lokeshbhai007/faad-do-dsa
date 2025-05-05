
// app/api/questions/[id]/route.js



import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';

export async function GET(request, { params }) {
    try {
      // In Next.js 13/14, params is already resolved, no need to await it
      const id = params.id;
      
      // Connect to database
      await connectToDatabase();
      
      let question;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // If ID is a MongoDB ObjectId
        question = await Question.findById(id);
      } else {
        // If ID is a question number
        question = await Question.findOne({ questionNumber: parseInt(id) });
      }
      
      if (!question) {
        return NextResponse.json(
          { error: 'Question not found' }, 
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true, question });
    } catch (error) {
      console.error('Error fetching question:', error);
      return NextResponse.json(
        { error: 'Failed to fetch question', details: error.message }, 
        { status: 500 }
      );
    }
}