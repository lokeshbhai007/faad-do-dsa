// components/QuestionCard.jsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Tag, Calendar, BookOpen, BarChart3 } from 'lucide-react';

export default function QuestionCard({ question }) {
  // Format difficulty with proper color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-500 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'hard': return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-green-500 bg-green-50 border-green-200'; // Default
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Link href={`/questions/${question._id}`}>
      <div className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <span className="font-mono text-gray-500 mr-2">{question.questionNumber}.</span>
              <h3 className="font-medium text-lg text-gray-900 line-clamp-1">{question.originalQuestion}</h3>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {question.simplifiedExplanation || "No explanation available"}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            {question.difficulty && (
              <span className={`px-2 py-1 rounded-full border ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
            )}
            
            {question.topics && question.topics.length > 0 && question.topics[0] !== "None specified" && (
              <div className="flex items-center text-gray-500">
                <Tag className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">
                  {question.topics.slice(0, 2).join(', ')}
                  {question.topics.length > 2 ? '...' : ''}
                </span>
              </div>
            )}
            
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(question.createdAt)}</span>
            </div>
          </div>
        </div>
        
        {/* Bottom stats */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>{question.examples?.length || 0} examples</span>
          </div>
          
          {question.companies && question.companies.length > 0 && question.companies[0] !== "None specified" && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">{question.companies[0]}</span>
              {question.companies.length > 1 && ` +${question.companies.length - 1}`}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}