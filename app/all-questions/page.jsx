// app/all-questions/page.jsx
import connectToDatabase from '@/lib/mongodb';
import Question from '@/models/Question';
import AllQuestionsPageClient from './client-component';
import { Suspense } from 'react';
import LoadingFallback from './loading-fallback';

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

export default async function AllQuestionsPage() {
  const questions = await getAllQuestions();
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AllQuestionsPageClient questions={questions} />
    </Suspense>
  );
}