"use client";

import { useState } from "react";
import { Clock, Database, Eye, EyeOff } from "lucide-react";
import CodeHighlighter from "./CodeHighlighter";

// Function to extract language from code block
const getCodeLanguage = (code) => {
  const languageMap = {
    "python": "python",
    "javascript": "javascript",
    "js": "javascript",
    "typescript": "typescript",
    "ts": "typescript",
    "java": "java",
    "c++": "cpp",
    "cpp": "cpp",
    "c#": "csharp",
    "csharp": "csharp",
    "go": "go",
    "ruby": "ruby",
    "swift": "swift",
    "kotlin": "kotlin",
    "rust": "rust",
    "php": "php",
    "sql": "sql",
  };

  const languageMatch = code.match(/^```(\w+)/);
  if (languageMatch && languageMatch[1]) {
    const lang = languageMatch[1].toLowerCase();
    return languageMap[lang] || "C++";
  }
  return "C++";
};

export default function ApproachSection({ approaches }) {
  const [visibleCodeSections, setVisibleCodeSections] = useState({});

  // Function to toggle code visibility for an approach
  const toggleCodeVisibility = (index) => {
    setVisibleCodeSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!approaches || approaches.length === 0) {
    return (
      <p className="text-gray-400">
        No detailed approaches available for this problem yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {approaches.map((approach, index) => (
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
                <Clock className="w-4 h-4 mr-1" />
                <span className="font-2xl text-blue-300">
                  {approach.timeComplexity || "N/A"}
                </span>
              </span>
              <span className="text-gray-400 flex items-center">
                <Database className="w-4 h-4 mr-1" />
                <span className="font-2xl text-green-300">
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
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-200">
                    Code:
                  </h4>
                  <button
                    onClick={() => toggleCodeVisibility(index)}
                    className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-gray-750 rounded-md border border-gray-700"
                  >
                    {visibleCodeSections[index] ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-1" />
                        Hide Code
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-1" />
                        Show Code
                      </>
                    )}
                  </button>
                </div>
                {visibleCodeSections[index] && (
                  <div className="mt-3 transition-all duration-300 ease-in-out">
                    <CodeHighlighter 
                      code={approach.code}
                      language={getCodeLanguage(approach.code)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}