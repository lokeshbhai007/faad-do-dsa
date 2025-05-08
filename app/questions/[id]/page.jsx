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
    <div className="flex flex-col min-h-screen bg-gray-950">
      {/* Header with back button */}
      <header className="bg-gray-900 ml-8 mt-6 border-b rounded-2xl px-3 py-3 w-57 hover:bg-blue-900 border-gray-800">
        {/* <div className="max-w mx-auto  px-4 sm:px-6 lg:px-8"> */}
          
            <Link href="/all-questions" className="flex items-center text-blue-400 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Analysis Form</span>
            </Link>
        
        {/* </div> */}
      </header>
      
      {/* Main content - grows to fill available space */}
      <main className="flex-1 flex flex-col">
        <div className="max-w mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
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
          
          {/* Render the Leetcode-style UI component to fill remaining space */}
          <div className="flex-1 flex">
            <ServerLeetcodeQuestion question={question} />
          </div>
        </div>
      </main>
    </div>
  );
}