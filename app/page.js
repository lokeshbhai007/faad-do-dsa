// app/page.js

import Link from 'next/link';
import QuestionForm from '@/components/QuestionForm';
import { PlusCircle, Book, ListIcon } from 'lucide-react';

// This is a Server Component
export default async function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-col gap-6 mx-10">
        {/* Left sidebar */}
        <div className="w-full md:w-full lg:w-full">
          <QuestionForm />
        </div>

        {/* Navigation Button */}
        <div className="w-full">
          <Link href="/all-questions" className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg shadow-sm border border-blue-200 hover:bg-blue-100 transition-colors">
            <ListIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">View All Previous Questions</span>
          </Link>
        </div>
      </div>
    </main>
  );
}