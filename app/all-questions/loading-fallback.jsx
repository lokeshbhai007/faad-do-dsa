// app/all-questions/loading-fallback.jsx
import { ArrowLeft, Search } from 'lucide-react';

export default function LoadingFallback() {
  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen">
      {/* Global loading bar at the top */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-loading-bar"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with back button and search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <div className="inline-block mb-4 md:mb-5 bg-blue-600/10 rounded-xl">
              <button className="flex items-center px-5 py-2.5 text-blue-400 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Analysis Form
              </button>
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
        
        {/* Filter bar - skeleton */}
        <div className="flex flex-wrap items-center gap-4 mb-8 bg-gray-800/70 backdrop-blur-sm p-5 rounded-xl border border-gray-700 shadow-lg">
          <div className="animate-pulse flex w-full justify-between">
            <div className="h-8 bg-gray-700 rounded-lg w-1/4"></div>
            <div className="h-8 bg-gray-700 rounded-lg w-1/5"></div>
            <div className="h-8 bg-gray-700 rounded-lg w-1/5"></div>
          </div>
        </div>
        
        {/* Grid Layout - skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {Array(8).fill().map((_, index) => (
            <div key={index} className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 overflow-hidden flex flex-col animate-pulse">
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-500"></div>
              </div>
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-700 rounded-full w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="flex gap-2 mt-6">
                  <div className="h-6 bg-gray-700 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-700 rounded-full w-20"></div>
                </div>
              </div>
              <div className="bg-gray-800/90 px-6 py-3.5 border-t border-gray-700 flex items-center">
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                <div className="ml-auto h-4 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}