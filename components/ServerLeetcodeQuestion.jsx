// components/ServerLeetcodeQuestion.jsx
"use client";

import { useState } from "react";
import { CodeSquare, Code, HelpCircle, MessageSquare } from "lucide-react";

export default function ServerLeetcodeQuestion({ question }) {
  const [activeTab, setActiveTab] = useState("description");

  // Format difficulty with proper color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-500 bg-green-50";
      case "medium":
        return "text-yellow-500 bg-yellow-50";
      case "hard":
        return "text-red-500 bg-red-50";
      default:
        return "text-green-500 bg-green-50"; // Default to easy
    }
  };

  // Format code blocks in markdown
  const formatDescription = (text) => {
    if (!text) return "No description available";

    // Replace code blocks with styled versions
    return text.replace(
      /```([\s\S]*?)```/g,
      (_, code) =>
        `<pre class="bg-gray-800 text-white p-4 rounded-md my-3 overflow-x-auto">${code}</pre>`
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen bg-gray-50 rounded-lg shadow-sm overflow-hidden">
      {/* Main content */}
      <div className="flex-grow">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "description"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
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
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
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
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
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
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Explanation
              </div>
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="p-6 bg-white min-h-screen">
          {activeTab === "description" && (
            <div>
              <div className="flex gap-10 items-center justify-between">
                <h2 className="text-xl capitalize font-bold mb-4">
                  {question.questionNumber}. {question.originalQuestion}
                </h2>
                <span
                  className={`inline-block -mt-4 px-3 py-1 text-xl font-serif rounded-full ${getDifficultyColor(
                    question.difficulty
                  )}`}
                >
                  {question.difficulty || "Easy"}
                </span>
              </div>
              <div className="flex gap-1">
                {" "}
                Description :
                <div
                  className="prose max-w-none capitalize "
                  dangerouslySetInnerHTML={{
                    __html: formatDescription(
                      question.description || question.originalQuestion
                    ),
                  }}
                />
              </div>

              {/* Examples */}
              {question.examples && question.examples.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Examples:</h3>
                  <div className="space-y-6">
                    {question.examples.map((example, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-md border border-gray-200"
                      >
                        <p className="font-bold mb-2">Example {index + 1}:</p>

                        <div className="mb-2">
                          <span className="font-medium">Input: </span>
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            {example.input}
                          </code>
                        </div>

                        <div className="mb-2">
                          <span className="font-medium">Output: </span>
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            {example.output}
                          </code>
                        </div>

                        {example.explanation && (
                          <div>
                            <span className="font-medium">Explanation: </span>
                            <p className="text-gray-700">
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
              <h2 className="text-xl font-bold mb-4">Solutions</h2>
              {question.solutions &&
              question.solutions.length > 0 &&
              question.solutions[0] !== "No solutions available" ? (
                <div className="space-y-8">
                  {question.solutions.map((solution, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                        <h3 className="font-medium">Approach {index + 1}</h3>
                      </div>
                      <div className="p-4">
                        <div
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: formatDescription(solution),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No solutions available for this problem yet.
                </p>
              )}
            </div>
          )}

          {activeTab === "hints" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Hints</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-700">
                  {question.hint || "No hints available for this problem."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "explanation" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Simplified Explanation</h2>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-gray-800 whitespace-pre-line">
                  {question.simplifiedExplanation ||
                    "No explanation available."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="lg:w-64 bg-white p-4 border-l border-gray-200 hidden lg:block">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Similar Questions
          </h3>
          <p className="text-gray-500 text-sm">Coming soon...</p>
        </div>

        <div className="py-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Acceptance</span>
              <span className="text-gray-900 font-medium">N/A</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Submissions</span>
              <span className="text-gray-900 font-medium">N/A</span>
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Related Topics
          </h3>
          {question.topics &&
          question.topics.length > 0 &&
          question.topics[0] !== "None specified" ? (
            <div className="flex flex-wrap gap-2">
              {question.topics.map((topic, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {topic}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No topics available</p>
          )}
        </div>
      </div>
    </div>
  );
}
