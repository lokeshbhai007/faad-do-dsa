// components/QuestionLayout.jsx
"use client";

import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function QuestionLayout({ children }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // We could handle global error states here
  useEffect(() => {
    const handleError = (error) => {
      console.error('Caught error:', error);
      setError(error.message || 'An unexpected error occurred');
    };
    
    // Add global error handler
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  // Handle errors gracefully
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-red-500 w-6 h-6 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Something went wrong</h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }

  // Loading state could be used for suspense/transitions
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render children with added layout features
  return (
    <div className="question-layout">
      {children}
      
      {/* Optional: Add floating action buttons or other UI elements */}
      <div className="fixed bottom-4 right-4 lg:hidden">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}