// app/questions/[id]/loading.jsx
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuestionLoading() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-4">
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Analysis Form
        </Link>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Skeleton UI for the LeetCode-style layout */}
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left sidebar skeleton */}
            <div className="lg:w-64 bg-white p-4 border-r border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-2"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
              
              <div className="mb-4">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div className="py-4 border-t border-gray-200">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Main content skeleton */}
            <div className="flex-grow">
              {/* Tabs skeleton */}
              <div className="bg-white border-b border-gray-200">
                <div className="flex p-2">
                  <div className="px-4 py-2 mr-2 w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="px-4 py-2 mr-2 w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="px-4 py-2 mr-2 w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="px-4 py-2 w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Tab content skeleton */}
              <div className="p-6 bg-white">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 mb-6"></div>
                
                <div className="space-y-4 mb-8">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                </div>
                
                <div className="mt-8">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-4"></div>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-24 mb-4"></div>
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-24 mb-4"></div>
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar skeleton */}
            <div className="lg:w-64 bg-white p-4 border-l border-gray-200 hidden lg:block">
              <div className="mb-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-36 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
              </div>
              
              <div className="py-4 border-t border-gray-200">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-16 mb-2"></div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
                  </div>
                </div>
              </div>
              
              <div className="py-4 border-t border-gray-200">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-28 mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}