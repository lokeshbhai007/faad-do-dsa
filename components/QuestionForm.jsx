// components/QuestionForm.jsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Send, X } from 'lucide-react';

export default function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">Analyze New Problem</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
            Enter a DSA problem
          </label>
          <div className="relative">
            <textarea
              id="question"
              rows={6}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste your algorithm or data structure question here..."
            />
            {question && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                aria-label="Clear input"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className={`
              flex items-center justify-center px-4 py-2 rounded-md text-white
              ${loading || !question.trim() 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }
              transition-colors duration-200
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
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <p>Example: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."</p>
      </div>
    </div>
  );
}