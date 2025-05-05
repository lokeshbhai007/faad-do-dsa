// app/questions/[id]/page.jsx


import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';
import ServerLeetcodeQuestion from '@/components/ServerLeetcodeQuestion';
import QuestionLayout from '@/components/QuestionLayout';

// Fetch question data by ID
async function getQuestionById(id) {
  try {
    await connectToDatabase();
    const question = await Question.findById(id);
    
    if (!question) {
      return null;
    }
    
    return JSON.parse(JSON.stringify(question));
  } catch (error) {
    console.error('Error fetching question:', error);
    return null;
  }
}

export default async function QuestionPage({ params }) {
  // In Next.js App Router, we need to handle params more carefully
  // Make sure we're working with the resolved value
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  const question = await getQuestionById(id);
  
  if (!question) {
    notFound();
  }
  
  return (
    <QuestionLayout>
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-4">
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analysis Form
          </Link>
          
          {/* Render the Leetcode-style UI component */}
          <ServerLeetcodeQuestion question={question} />
        </div>
      </main>
    </QuestionLayout>
  );
}