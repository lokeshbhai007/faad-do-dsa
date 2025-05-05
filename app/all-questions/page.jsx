import Link from 'next/link';
import { ArrowLeft, Filter, Search, Calendar, BookOpen, Tag, ChevronDown, Clock, Hash, BarChart2, SlidersHorizontal } from 'lucide-react';
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

// Map difficulty to color classes - dark theme friendly
const difficultyClasses = {
  easy: "bg-emerald-900/60 text-emerald-300 border border-emerald-700",
  medium: "bg-amber-900/60 text-amber-300 border border-amber-700",
  hard: "bg-red-900/60 text-red-300 border border-red-700"
};

export default async function AllQuestionsPage() {
  const questions = await getAllQuestions();
  
  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with back button and search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <div className="inline-block mb-4 md:mb-5 bg-blue-600/10 rounded-xl hover:bg-blue-600/20 transition-all duration-300">
              <Link 
                href="/" 
                className="flex items-center px-5 py-2.5 text-blue-400 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Analysis Form
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">All Analyzed Problems</h1>
            <p className="text-gray-400">Browse, filter and review your analyzed problem collection</p>
          </div>
          
          {/* Search box */}
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems by number, content or topic..."
              className="pl-10 pr-4 py-3 w-full md:w-96 bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            />
          </div>
        </div>
        
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8 bg-gray-800/70 backdrop-blur-sm p-5 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-blue-400" />
            <span className="text-gray-200 text-sm font-medium">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg transition-colors font-medium hover:bg-blue-500">
                <Filter className="h-4 w-4" />
                All Difficulties
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 w-48 hidden group-hover:block z-10">
                <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700">All Difficulties</button>
                <button className="w-full text-left px-4 py-2 text-sm text-emerald-300 hover:bg-gray-700">Easy</button>
                <button className="w-full text-left px-4 py-2 text-sm text-amber-300 hover:bg-gray-700">Medium</button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-gray-700">Hard</button>
              </div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg transition-colors hover:bg-gray-600">
                <Hash className="h-4 w-4" />
                Topics
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg transition-colors hover:bg-gray-600">
                <Clock className="h-4 w-4" />
                Date Added
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg transition-colors hover:bg-gray-600">
                <BarChart2 className="h-4 w-4" />
                Sort By
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="flex items-center bg-gray-850 rounded-lg p-1">
              <button className="p-2 bg-blue-600 rounded-lg shadow-md">
                <Tag className="h-4 w-4 text-white" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <BookOpen className="h-4 w-4 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
        
        {questions.length === 0 ? (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-blue-600/30 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Problems Found</h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">You haven't analyzed any problems yet. Get started by analyzing your first problem.</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium shadow-lg"
            >
              Analyze Your First Problem
            </Link>
          </div>
        ) : (
          <>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
              {questions.map((question) => (
                <Link 
                  key={question._id}
                  href={`/questions/${question._id}`}
                  className="block group"
                >
                  <div className="h-full bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:border-blue-500 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col">
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-500"></div>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-bold text-xl text-white">
                          Problem #{question.questionNumber}
                        </span>
                        {question.difficulty && (
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${difficultyClasses[question.difficulty] || "bg-gray-700 text-gray-300 border border-gray-600"}`}>
                            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 line-clamp-3 mb-5 h-18">
                        {question.originalQuestion.length > 180 
                          ? question.originalQuestion.substring(0, 180) + '...' 
                          : question.originalQuestion}
                      </p>
                      {question.topics && question.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {question.topics.slice(0, 2).map((topic, index) => (
                            <span key={index} className="px-3 py-1 text-xs bg-blue-900/60 text-blue-300 border border-blue-700 rounded-full truncate max-w-full">
                              {topic}
                            </span>
                          ))}
                          {question.topics.length > 2 && (
                            <span className="px-3 py-1 text-xs bg-gray-700/60 text-gray-300 rounded-full">
                              +{question.topics.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-800/90 px-6 py-3.5 text-xs text-gray-400 border-t border-gray-700 flex items-center">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        {new Date(question.createdAt).toLocaleDateString()}
                      </div>
                      <div className="ml-auto flex items-center text-blue-400 font-medium group-hover:text-blue-300">
                        View Details
                        <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {questions.length > 12 && (
              <div className="flex justify-center mt-10 mb-6">
                <div className="flex items-center gap-3 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700 p-2 shadow-lg">
                  <button className="px-5 py-2.5 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                    3
                  </button>
                  <span className="text-gray-500 mx-1">...</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                    12
                  </button>
                  <button className="px-5 py-2.5 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors flex items-center">
                    Next
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </button>
                </div>
              </div>
            )}
            
            <div className="text-center text-gray-500 text-sm mb-8">
              Showing {Math.min(questions.length, 12)} of {questions.length} problems
            </div>
          </>
        )}
      </div>
    </main>
  );
}