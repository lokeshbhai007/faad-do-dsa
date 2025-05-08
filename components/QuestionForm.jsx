"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Send, X, Code, Braces, Sparkles } from 'lucide-react';
// import { List, Code,  } from "lucide-react";

// Floating Code Elements Animation
const FloatingCodeElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <div 
          key={i}
          className="absolute text-pink-500 opacity-50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float-${i} ${8 + Math.random() * 10}s ease-in-out infinite`,
          }}
          suppressHydrationWarning
        >
          {i % 2 === 0 ? <Code size={20} /> : <Braces size={20} />}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -30px) rotate(10deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-25px, -20px) rotate(-5deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -25px) rotate(8deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, -15px) rotate(-12deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -10px) rotate(15deg); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -35px) rotate(-8deg); }
        }
        @keyframes float-6 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, -20px) rotate(5deg); }
        }
        @keyframes float-7 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -25px) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
};

export default function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  
  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!question.trim()) {
      setError('Please enter a question to analyze');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze question');
      }
      
      // Redirect to the question page
      router.push(`/questions/${data.question._id}`);
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior (newline)
      handleSubmit();
    }
  };

  return (
    <div className={`relative bg-gray-900 rounded-lg shadow-md border border-gray-700 p-6 transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
      {/* Background animation */}
      <FloatingCodeElements />
      
      {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-lg bg-slate-900 opacity-0 hover:opacity-40 transition-opacity duration-500"></div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center">
        Algorithm
        <span className="relative mx-2">
          <Sparkles className="h-8 w-8 text-blue-400 inline" />
        </span>
        Analyzer
      </h2>
      
      <div className="relative z-10">
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-1">
          </label>
          <div className="relative group">
            <textarea
              id="question"
              rows={6}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-600"
              placeholder="Paste your algorithm or data structure question here..."
              onKeyDown={handleKeyDown}
            />
            {question && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                aria-label="Clear input"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {error && <p className="mt-2 text-xl text-red-400">{error}</p>}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading || !question.trim()}
            className={`
              flex items-center justify-center px-4 py-2 rounded-md text-white
              ${loading || !question.trim()
                ? 'bg-blue-800 opacity-50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 transition-all duration-300 transform hover:shadow-lg'
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Analyze
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-400 transition-opacity duration-500 hover:text-gray-300">
        <p className="border-t border-gray-800 pt-4">Example: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."</p>
        <p className="mt-2 text-xs italic">Press Enter to submit your question or Shift+Enter for a new line.</p>
      </div>
    </div>
  );
}