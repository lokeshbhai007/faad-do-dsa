"use client";

import { useState } from "react";
import {
  CodeSquare,
  Code,
  HelpCircle,
  MessageSquare,
  BookOpen,
  Building,
  Hash,
  ChevronDown,
  ChevronUp,
  Clock,
  Database,
  Star,
  BarChart,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";

export default function ServerLeetcodeQuestion({ question }) {
  const [activeTab, setActiveTab] = useState("description");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedSimilarQuestion, setSelectedSimilarQuestion] = useState(null);

  // Format difficulty with proper color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-emerald-400 bg-emerald-900/40 border-emerald-700";
      case "medium":
        return "text-amber-400 bg-amber-900/40 border-amber-700";
      case "hard":
        return "text-rose-400 bg-rose-900/40 border-rose-700";
      default:
        return "text-emerald-400 bg-emerald-900/40 border-emerald-700"; // Default to easy
    }
  };

  // Format code blocks in markdown
  const formatDescription = (text) => {
    if (!text) return "No description available";

    // Replace code blocks with styled versions
    return text.replace(
      /```([\s\S]*?)```/g,
      (_, code) =>
        `<pre class="bg-gray-900 text-gray-100 p-4 rounded-md my-3 overflow-x-auto border border-gray-700">${code}</pre>`
    );
  };

  // Function to toggle description length on mobile
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Function to open similar question modal
  const openSimilarQuestionModal = (question) => {
    setSelectedSimilarQuestion(question);
  };

  // Function to close similar question modal
  const closeSimilarQuestionModal = () => {
    setSelectedSimilarQuestion(null);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-9rem)] bg-gray-950 rounded-lg shadow-lg overflow-hidden border border-gray-800 w-full">
      {/* Main content */}
      <div className="flex-grow">
        {/* Question title and metadata - mobile first */}
        <div className="bg-gray-900 p-4 sm:p-6 border-b border-gray-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {question.questionNumber}. {question.originalQuestion}
            </h1>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(
                  question.difficulty
                )}`}
              >
                {question.difficulty || "Easy"}
              </span>
            </div>
          </div>

          {/* Topics tags */}
          {question.topics &&
            question.topics.length > 0 &&
            question.topics[0] !== "None specified" && (
              <div className="mt-2 mb-4">
                <div className="flex flex-wrap gap-2">
                  {question.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-blue-900/50 text-blue-300 border border-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Companies - visible on mobile */}
          {question.companies && question.companies.length > 0 && (
            <div className="lg:hidden mt-3">
              <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Building className="w-4 h-4 mr-1" />
                Top Companies
              </h3>
              <div className="flex flex-wrap gap-1">
                {question.companies.map((company, index) => (
                  <span
                    key={index}
                    className="bg-violet-900/50 text-violet-300 border border-violet-700 text-xs px-2 py-1 rounded-full"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-gray-900 border-b border-gray-800 overflow-x-auto">
          <div className="flex whitespace-nowrap">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "description"
                  ? "text-blue-400 border-b-2 border-blue-500 bg-gray-800"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center">
                <CodeSquare className="w-4 h-4 mr-2" />
                Description
              </div>
            </button>
            <button
              onClick={() => setActiveTab("solutions")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "solutions"
                  ? "text-blue-400 border-b-2 border-blue-500 bg-gray-800"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Solutions
              </div>
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "hints"
                  ? "text-blue-400 border-b-2 border-blue-500 bg-gray-800"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                Hints
              </div>
            </button>
            <button
              onClick={() => setActiveTab("explanation")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "explanation"
                  ? "text-blue-400 border-b-2 border-blue-500 bg-gray-800"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Explanation
              </div>
            </button>
            <button
              onClick={() => setActiveTab("approaches")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "approaches"
                  ? "text-blue-400 border-b-2 border-blue-500 bg-gray-800"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Approaches
              </div>
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="p-4 sm:p-6 bg-gray-900 min-h-[60vh] text-gray-200">
          {activeTab === "description" && (
            <div>
              <div
                className={`prose prose-invert max-w-none ${
                  !showFullDescription && "lg:block"
                }`}
              >
                <div
                  className={`${
                    !showFullDescription
                      ? "max-h-32 lg:max-h-none overflow-hidden relative"
                      : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: formatDescription(
                      question.description || question.originalQuestion
                    ),
                  }}
                ></div>
                {!showFullDescription && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent lg:hidden"></div>
                )}
              </div>

              {/* Show more/less button for mobile */}
              <button
                className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium lg:hidden flex items-center"
                onClick={toggleDescription}
              >
                {showFullDescription ? (
                  <>
                    Show less <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              {/* Examples */}
              {question.examples && question.examples.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4 text-white">
                    Examples:
                  </h3>
                  <div className="space-y-4">
                    {question.examples.map((example, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 p-4 rounded-md border border-gray-700"
                      >
                        <p className="font-bold mb-2 text-white">
                          Example {index + 1}:
                        </p>

                        <div className="mb-2">
                          <span className="font-medium text-gray-300">
                            Input:{" "}
                          </span>
                          <code className="bg-gray-900 px-2 py-1 rounded text-gray-200 border border-gray-700">
                            {example.input}
                          </code>
                        </div>

                        <div className="mb-2">
                          <span className="font-medium text-gray-300">
                            Output:{" "}
                          </span>
                          <code className="bg-gray-900 px-2 py-1 rounded text-gray-200 border border-gray-700">
                            {example.output}
                          </code>
                        </div>

                        {example.explanation && (
                          <div>
                            <span className="font-medium text-gray-300">
                              Explanation:{" "}
                            </span>
                            <p className="text-gray-300">
                              {example.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "solutions" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Solutions</h2>
              {question.solutions &&
              question.solutions.length > 0 &&
              question.solutions[0] !== "No solutions available" ? (
                <div className="space-y-6">
                  {question.solutions.map((solution, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="bg-gray-850 p-3 border-b border-gray-700 flex items-center">
                        <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                        <h3 className="font-medium text-white">
                          Solution {index + 1}
                        </h3>
                      </div>
                      <div className="p-4">
                        <div
                          className="prose prose-invert max-w-none overflow-x-auto"
                          dangerouslySetInnerHTML={{
                            __html: formatDescription(solution),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  No solutions available for this problem yet.
                </p>
              )}
            </div>
          )}

          {activeTab === "hints" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Hints</h2>
              <div className="bg-yellow-900/30 border-l-4 border-yellow-600 p-4 rounded-r-md">
                <p className="text-yellow-300">
                  {question.hint || "No hints available for this problem."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "explanation" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">
                Simplified Explanation
              </h2>
              <div className="bg-blue-900/30 p-4 rounded-md border border-blue-800">
                <p className="text-gray-200 whitespace-pre-line">
                  {question.simplifiedExplanation ||
                    "No explanation available."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "approaches" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Approaches</h2>
              {question.approaches && question.approaches.length > 0 ? (
                <div className="space-y-6">
                  {question.approaches.map((approach, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="bg-gray-850 p-3 border-b border-gray-700 flex justify-between flex-wrap gap-2">
                        <div className="flex items-center">
                          <div className="bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-white">
                              {index + 1}
                            </span>
                          </div>
                          <h3 className="font-medium text-white">
                            {approach.name || `Approach ${index + 1}`}
                          </h3>
                        </div>
                        <div className="flex space-x-3 text-sm">
                          <span className="text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span className="font-medium text-blue-300">
                              {approach.timeComplexity || "N/A"}
                            </span>
                          </span>
                          <span className="text-gray-400 flex items-center">
                            <Database className="w-3 h-3 mr-1" />
                            <span className="font-medium text-green-300">
                              {approach.spaceComplexity || "N/A"}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 text-gray-200">
                            Explanation:
                          </h4>
                          <p className="text-gray-300">
                            {approach.explanation || "No explanation provided."}
                          </p>
                        </div>
                        {approach.code && (
                          <div>
                            <h4 className="font-medium mb-2 text-gray-200">
                              Code:
                            </h4>
                            <div
                              className="prose prose-invert max-w-none overflow-x-auto"
                              dangerouslySetInnerHTML={{
                                __html: formatDescription(approach.code),
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  No detailed approaches available for this problem yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar - redesigned with cards */}
      <div className="lg:w-80 bg-gray-850 p-4 border-l border-gray-700 hidden lg:block">
        {/* Companies section - Card Style */}
        {question.companies && question.companies.length > 0 && (
          <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-md">
            <h3 className="text-sm font-medium text-white mb-3 flex items-center">
              <Building className="w-4 h-4 mr-2 text-blue-400" />
              Top Companies
            </h3>
            <div className="flex flex-wrap gap-2">
              {question.companies.map((company, index) => (
                <span
                  key={index}
                  className="bg-violet-900/40 text-violet-300 border border-violet-700 text-xs px-2 py-1 rounded-md hover:bg-violet-800/40 transition-colors cursor-default"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Similar Questions section - Card Style */}
        <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-md">
          <h3 className="text-sm font-medium text-white mb-3 flex items-center">
            <Hash className="w-4 h-4 mr-2 text-green-400" />
            Similar Questions
          </h3>
          {question.similarQuestions && question.similarQuestions.length > 0 ? (
            <div className="space-y-2">
              {question.similarQuestions.slice(0, 5).map((similar, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-2 rounded text-sm text-gray-200 hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700 flex items-center"
                  onClick={() => openSimilarQuestionModal(similar)}
                >
                  <Star className="w-3 h-3 mr-2 text-yellow-400" />
                  {similar.title || `Question ${index + 1}`}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              Similar questions coming soon...
            </p>
          )}
        </div>

        {/* Related Topics section - Card Style */}
        <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-md">
          <h3 className="text-sm font-medium text-white mb-3 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-amber-400" />
            Related Topics
          </h3>
          {question.topics &&
          question.topics.length > 0 &&
          question.topics[0] !== "None specified" ? (
            <div className="flex flex-wrap gap-2">
              {question.topics.map((topic, index) => (
                <span
                  key={index}
                  className="bg-blue-900/40 text-blue-300 border border-blue-700 text-xs px-2 py-1 rounded-md hover:bg-blue-800/40 transition-colors cursor-default"
                >
                  {topic}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No topics available</p>
          )}
        </div>

        {/* Created and Success Rate with Completion Badge */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xs text-gray-400">
              Created: {new Date(question.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Question Modal */}
      {selectedSimilarQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 w-full max-w-2xl overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">
                  {selectedSimilarQuestion.title}
                </h3>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(
                    selectedSimilarQuestion.difficulty
                  )}`}
                >
                  {selectedSimilarQuestion.difficulty}
                </span>
              </div>
              <button
                onClick={closeSimilarQuestionModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <h4 className="text-white font-medium mb-2">Description:</h4>
              <p className="text-gray-300 mb-6">
                {selectedSimilarQuestion.description ||
                  "No description available."}
              </p>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={closeSimilarQuestionModal}
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
