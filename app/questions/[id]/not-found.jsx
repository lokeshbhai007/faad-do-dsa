// app/questions/[id]/not-found.jsx
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function QuestionNotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Analysis Form
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Question Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the question you're looking for. It may have been removed or the ID might be incorrect.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </main>
  );
}