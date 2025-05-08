"use client";
import "@/app/globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Filter,
  Search,
  Calendar,
  BookOpen,
  Tag,
  ChevronDown,
  Clock,
  Hash,
  BarChart2,
  SlidersHorizontal,
  X,
  Bookmark,
  Eye,
} from "lucide-react";

// Toast notification component
function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  
  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-up`}>
      {message}
      <button onClick={onClose} className="ml-3 hover:bg-white/20 rounded-full p-1">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Map difficulty to color classes - dark theme friendly
const difficultyClasses = {
  easy: "bg-emerald-900/60 text-emerald-300 border border-emerald-700",
  medium: "bg-amber-900/60 text-amber-300 border border-amber-700",
  hard: "bg-red-900/60 text-red-300 border border-red-700",
};

// LoadingBar component
function LoadingBar({ isLoading }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 z-50 transition-all duration-300 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 ${
          isLoading ? "animate-loading-bar" : ""
        }`}
      ></div>
    </div>
  );
}

// Format dates consistently to avoid hydration errors
function formatDate(dateString) {
  const date = new Date(dateString);
  // Use explicit format DD/MM/YYYY that will be consistent between server and client
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

// Mark Questions Dialog Component
function MarkQuestionsDialog({ isOpen, onClose, onSubmit, showToast }) {
  const [formData, setFormData] = useState({
    questionNo: "",
    questionName: "",
    solvingPlatform: "",
    platformQsnNo: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/reviewQuestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form and close dialog on success
        setFormData({
          questionNo: "",
          questionName: "",
          solvingPlatform: "",
          platformQsnNo: "",
          note: "",
        });
        onSubmit();
        showToast("Marked Done"); // Use the showToast function instead of toast
      } else {
        console.error("Failed to save review question");
        showToast("Failed to save question", "error");
      }
    } catch (error) {
      console.error("Error saving review question:", error);
      showToast("An error occurred", "error");
    }
  };

  // Handle Enter key press in form fields
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && formData.questionNo) {
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl w-full max-w-lg p-3 px-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Mark Question for Review
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6 text-gray-200" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="questionNo"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Question Number <span className="text-red-400">*</span>
              </label>
              <input
                id="questionNo"
                name="questionNo"
                type="number"
                required
                value={formData.questionNo}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Enter question number"
              />
            </div>

            <div>
              <label
                htmlFor="questionName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Question Name <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="questionName"
                name="questionName"
                type="text"
                value={formData.questionName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Enter question name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="solvingPlatform"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Solving Platform{" "}
                  <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  id="solvingPlatform"
                  name="solvingPlatform"
                  type="text"
                  value={formData.solvingPlatform}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="e.g., LeetCode, HackerRank"
                />
              </div>

              <div>
                <label
                  htmlFor="platformQsnNo"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Platform Question No.{" "}
                  <span className="text-gray-500"></span>
                </label>
                <input
                  id="platformQsnNo"
                  name="platformQsnNo"
                  type="text"
                  value={formData.platformQsnNo}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Platform's question number"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Note <span className="text-red-400">*</span>
              </label>
              <textarea
                id="note"
                name="note"
                required
                value={formData.note}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[120px] resize-y"
                placeholder="Add any notes about this question"
              ></textarea>
            </div>

            <div className="pt-1 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-2/3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg flex items-center justify-center"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save Question for Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AllQuestionsPageClient({ questions = [] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMarkDialogOpen, setIsMarkDialogOpen] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({
    message: "",
    show: false,
    type: "success"
  });

  // Function to show toast
  const showToast = (message, type = "success") => {
    setToast({
      message,
      show: true,
      type
    });
  };

  // Function to hide toast
  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      show: false
    }));
  };
  
  // Add animation keyframes to global CSS
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        
        @keyframes loading-bar {
          0% { width: 0%; }
          20% { width: 20%; }
          40% { width: 40%; }
          60% { width: 60%; }
          80% { width: 80%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // Use useEffect to handle client-side only code
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle navigation with loading state
  const handleNavigation = (path) => {
    setIsLoading(true);
    router.push(path);
  };

  // Pre-define pagination numbers to ensure consistency
  const paginationNumbers = [1, 2, 3, 12];

  // Handle mark question form submission
  const handleMarkFormSubmit = () => {
    setIsMarkDialogOpen(false);
    // Success toast is now handled by the dialog component
  };

  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen">
      <LoadingBar isLoading={isLoading} />
      
      {/* Render toast if visible */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
      
      <MarkQuestionsDialog
        isOpen={isMarkDialogOpen}
        onClose={() => setIsMarkDialogOpen(false)}
        onSubmit={handleMarkFormSubmit}
        showToast={showToast}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with back button and search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <div className="inline-block mb-4 md:mb-5 bg-blue-600/10 rounded-xl hover:bg-blue-600/20 transition-all duration-300">
              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center px-5 py-2.5 text-blue-400 font-medium"
                suppressHydrationWarning
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Analysis Form
              </button>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              All Analyzed Problems
            </h1>
            <p className="text-gray-400">
              Browse, filter and review your analyzed problem collection
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems by number, content or topic..."
              className="pl-10 pr-4 py-3 w-full md:w-96 bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              suppressHydrationWarning
            />
          </div>
        </div>

        {/* Filter bar with added Review buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8 bg-gray-800/70 backdrop-blur-sm p-5 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-blue-400" />
            <span className="text-gray-200 text-sm font-medium">Filters:</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg transition-colors font-medium hover:bg-blue-500"
                suppressHydrationWarning
              >
                <Filter className="h-4 w-4" />
                All Difficulties
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 w-48 hidden group-hover:block z-10">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  suppressHydrationWarning
                >
                  All Difficulties
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-emerald-300 hover:bg-gray-700"
                  suppressHydrationWarning
                >
                  Easy
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-amber-300 hover:bg-gray-700"
                  suppressHydrationWarning
                >
                  Medium
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-gray-700"
                  suppressHydrationWarning
                >
                  Hard
                </button>
              </div>
            </div>

            <div className="relative group">
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg transition-colors hover:bg-gray-600"
                suppressHydrationWarning
              >
                <Hash className="h-4 w-4" />
                Topics
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="relative group">
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg transition-colors hover:bg-gray-600"
                suppressHydrationWarning
              >
                <Clock className="h-4 w-4" />
                Date Added
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-3">
            {/* Mark Question Button */}
            <button
              onClick={() => setIsMarkDialogOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg transition-colors hover:bg-purple-500 font-medium"
              suppressHydrationWarning
            >
              <Bookmark className="h-4 w-4" />
              Mark Question
            </button>

            {/* View Marked Questions Button */}
            <button
              onClick={() =>
                handleNavigation("/all-questions/marked-questions")
              }
              className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg transition-colors hover:bg-indigo-500 font-medium"
              suppressHydrationWarning
            >
              <Eye className="h-4 w-4" />
              View Marked
            </button>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-blue-600/30 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              No Problems Found
            </h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              You haven't analyzed any problems yet. Get started by analyzing
              your first problem.
            </p>
            <button
              onClick={() => handleNavigation("/")}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium shadow-lg"
              suppressHydrationWarning
            >
              Analyze Your First Problem
            </button>
          </div>
        ) : (
          <div>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
              {questions.map((question) => (
                <div
                  key={question._id}
                  onClick={() => handleNavigation(`/questions/${question._id}`)}
                  className="block group cursor-pointer"
                >
                  <div className="h-full bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:border-blue-500 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col">
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-500"></div>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-bold text-xl text-white">
                          Problem #{question.questionNumber}
                        </span>
                        {question.difficulty && (
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              difficultyClasses[question.difficulty] ||
                              "bg-gray-700 text-gray-300 border border-gray-600"
                            }`}
                          >
                            {question.difficulty.charAt(0).toUpperCase() +
                              question.difficulty.slice(1)}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 line-clamp-3 capitalize mb-5 h-18">
                        {question.originalQuestion.length > 180
                          ? question.originalQuestion.substring(0, 180) + "..."
                          : question.originalQuestion}
                      </p>
                      {question.topics && question.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {question.topics.slice(0, 2).map((topic, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-xs bg-blue-900/60 text-blue-300 border border-blue-700 rounded-full truncate max-w-full"
                            >
                              {topic}
                            </span>
                          ))}
                          {question.topics.length > 2 && (
                            <span className="px-3 py-1 text-xs bg-gray-700/60 text-gray-300 rounded-full">
                              +{question.topics.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-800/90 px-6 py-3.5 text-xs text-gray-400 border-t border-gray-700 flex items-center">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        {/* Use the formatDate helper to ensure consistent formatting */}
                        {formatDate(question.createdAt)}
                      </div>
                      <div className="ml-auto flex items-center text-blue-400 font-medium group-hover:text-blue-300">
                        View Details
                        <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed pagination rendering with proper keys */}
            {mounted && questions.length > 12 && (
              <div className="flex justify-center mt-10 mb-6">
                <div className="flex items-center gap-3 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700 p-2 shadow-lg">
                  <button
                    className="px-5 py-2.5 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors flex items-center"
                    suppressHydrationWarning
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </button>
                  {paginationNumbers.map((num, index) => {
                    // Active page
                    if (index === 0) {
                      return (
                        <button
                          key={`page-${num}`}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium"
                          suppressHydrationWarning
                        >
                          {num}
                        </button>
                      );
                    }
                    // Last page with ellipsis if needed
                    else if (index === paginationNumbers.length - 1 && index > 2) {
                      // Use key directly on a div or Fragment
                      return (
                        <div key={`page-group-${num}`} className="flex items-center">
                          {index === 3 && (
                            <span className="text-gray-500 mx-1" key="ellipsis">
                              ...
                            </span>
                          )}
                          <button
                            key={`page-${num}`}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                            suppressHydrationWarning
                          >
                            {num}
                          </button>
                        </div>
                      );
                    }
                    // Regular pages
                    else {
                      return (
                        <button
                          key={`page-${num}`}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                          suppressHydrationWarning
                        >
                          {num}
                        </button>
                      );
                    }
                  })}
                  <button
                    className="px-5 py-2.5 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors flex items-center"
                    suppressHydrationWarning
                  >
                    Next
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            <div className="text-center text-gray-500 text-sm mb-8">
              Showing {Math.min(questions.length, 12)} of {questions.length}{" "}
              problems
            </div>
          </div>
        )}
      </div>
    </main>
  );
}