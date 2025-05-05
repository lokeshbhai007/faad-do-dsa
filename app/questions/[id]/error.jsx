// app/questions/[id]/error.jsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, RefreshCcw } from 'lucide-react';

export default function QuestionError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Question page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We couldn't load the question you requested. This might be due to a temporary issue or the question may not exist.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try again
            </button>
            
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}