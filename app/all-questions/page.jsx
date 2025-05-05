import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';

// Fetch all questions, sorted by questionNumber in descending order
async function getAllQuestions() {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .sort({ questionNumber: -1 })
      .lean();
    
    return JSON.parse(JSON.stringify(questions));
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

// Map difficulty to color classes
const difficultyClasses = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800"
};

export default async function AllQuestionsPage() {
  const questions = await getAllQuestions();
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Analysis Form
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">All Analyzed Problems</h1>
        
        {questions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-500">No problems have been analyzed yet.</p>
            <Link 
              href="/" 
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Analyze Your First Problem
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {questions.map((question) => (
                <li key={question._id}>
                  <Link 
                    href={`/questions/${question._id}`}
                    className="block p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-700 mr-2">
                          Problem #{question.questionNumber}
                        </span>
                        {question.difficulty && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyClasses[question.difficulty] || "bg-gray-100 text-gray-800"}`}>
                            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(question.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {question.originalQuestion.length > 150 
                        ? question.originalQuestion.substring(0, 150) + '...' 
                        : question.originalQuestion}
                    </p>
                    {question.topics && question.topics.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {question.topics.slice(0, 3).map((topic, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}