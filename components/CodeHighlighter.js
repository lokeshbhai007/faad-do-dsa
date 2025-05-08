"use client";

import { useState } from "react";
import { Copy, Check as CheckIcon } from "lucide-react";

// Languages for syntax highlighting
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

// Code syntax highlighter component
export default function CodeHighlighter({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);
  
  // Detect language from code block if specified
  let detectedLanguage = language;
  const languageMatch = code.match(/^```(\w+)/);
  if (languageMatch && languageMatch[1]) {
    const lang = languageMatch[1].toLowerCase();
    detectedLanguage = languageMap[lang] || language;
    // Remove the language marker
    code = code.replace(/^```\w+\n/, '').replace(/```$/, '');
  } else {
    // Remove just the backticks if no language specified
    code = code.replace(/^```\n?/, '').replace(/```$/, '');
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-850 rounded-md overflow-hidden border border-gray-700">
      {/* Language tag and copy button */}
      <div className="flex justify-between items-center px-3 py-2 bg-gray-900 text-xs border-b border-gray-700">
        <span className="text-blue-400 font-2xl uppercase">{detectedLanguage}</span>
        <button 
          onClick={copyToClipboard}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? (
            <span className="flex items-center text-green-400">
              <CheckIcon className="w-4 h-4 mr-1" />
              Copied!
            </span>
          ) : (
            <span className="flex items-center">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </span>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <div className="overflow-x-auto p-4 font-mono text-xl leading-relaxed">
        <pre className="whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}