// app/questions/[id]/page.jsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';
import ServerLeetcodeQuestion from '@/components/ServerLeetcodeQuestion';

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
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  const question = await getQuestionById(id);
  
  if (!question) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header with back button */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/analysis" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Analysis Form</span>
            </Link>
            
            {/* Question identifier */}
            <div className="hidden sm:flex items-center space-x-4">
              <span className="bg-blue-900/50 text-blue-300 border border-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Question #{question.questionNumber}
              </span>
              
              {/* Companies badges */}
              {question.companies && question.companies.length > 0 && (
                <div className="flex space-x-1">
                  {question.companies.slice(0, 2).map((company, idx) => (
                    <span key={idx} className="bg-violet-900/50 text-violet-300 border border-violet-700 px-2 py-1 rounded-full text-xs">
                      {company}
                    </span>
                  ))}
                  {question.companies.length > 2 && (
                    <span className="bg-violet-900/50 text-violet-300 border border-violet-700 px-2 py-1 rounded-full text-xs">
                      +{question.companies.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile question identifier */}
        <div className="sm:hidden flex flex-col space-y-2 mb-4">
          <span className="bg-blue-900/50 text-blue-300 border border-blue-700 px-3 py-1 rounded-full text-sm font-medium w-fit">
            Question #{question.questionNumber}
          </span>
          
          {/* Companies badges - mobile */}
          {question.companies && question.companies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {question.companies.map((company, idx) => (
                <span key={idx} className="bg-violet-900/50 text-violet-300 border border-violet-700 px-2 py-1 rounded-full text-xs">
                  {company}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Render the Leetcode-style UI component */}
        <div className="w-full overflow-hidden">
          <ServerLeetcodeQuestion question={question} />
        </div>
      </main>
    </div>
  );
}