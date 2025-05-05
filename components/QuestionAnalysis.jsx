// components/QuestionAnalysis.jsx
"use client";
import { useState } from 'react';
import { CheckCircle, AlertTriangle, Copy, Check } from 'lucide-react';

export default function QuestionAnalysis({ analysis }) {
  const [activeTab, setActiveTab] = useState('description');
  const [copiedSection, setCopiedSection] = useState(null);

  if (!analysis) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center p-8">
          <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
          <p className="text-gray-600">No analysis available. Please analyze a question first.</p>
        </div>
      </div>
    );
  }

  // Format difficulty with proper color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Copy text to clipboard
  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">{analysis.originalQuestion}</h2>
          {analysis.difficulty && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(analysis.difficulty)}`}>
              {analysis.difficulty}
            </span>
          )}
        </div>
        
        {/* Topics and Companies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {analysis.topics && analysis.topics.length > 0 && analysis.topics[0] !== "None specified" && 
            analysis.topics.map((topic, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {topic}
              </span>
            ))
          }
        </div>
        
        {analysis.companies && analysis.companies.length > 0 && analysis.companies[0] !== "None specified" && (
          <div className="flex flex-wrap gap-2">
            {analysis.companies.map((company, index) => (
              <span key={index} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">
                {company}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap
              ${activeTab === 'description' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('examples')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap
              ${activeTab === 'examples' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
          >
            Examples
          </button>
          <button 
            onClick={() => setActiveTab('solutions')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap
              ${activeTab === 'solutions' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
          >
            Solutions
          </button>
          <button 
            onClick={() => setActiveTab('explanation')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap
              ${activeTab === 'explanation' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
          >
            Explanation
          </button>
          <button 
            onClick={() => setActiveTab('hint')}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap
              ${activeTab === 'hint' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
          >
            Hint
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Problem Description</h3>
              <button 
                onClick={() => copyToClipboard(analysis.description, 'description')}
                className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                {copiedSection === 'description' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="prose max-w-none">
              {analysis.description || "No description available"}
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Examples</h3>
            </div>
            
            {analysis.examples && analysis.examples.length > 0 ? (
              <div className="space-y-6">
                {analysis.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold">Example {index + 1}:</p>
                      <button 
                        onClick={() => copyToClipboard(`Input: ${example.input}\nOutput: ${example.output}${example.explanation ? `\nExplanation: ${example.explanation}` : ''}`, `example-${index}`)}
                        className="flex items-center text-gray-500 hover:text-gray-700 text-xs"
                      >
                        {copiedSection === `example-${index}` ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="mb-2">
                      <span className="font-medium">Input: </span> 
                      <code className="bg-gray-100 px-2 py-1 rounded">{example.input}</code>
                    </div>
                    
                    <div className="mb-2">
                      <span className="font-medium">Output: </span>
                      <code className="bg-gray-100 px-2 py-1 rounded">{example.output}</code>
                    </div>
                    
                    {example.explanation && (
                      <div>
                        <span className="font-medium">Explanation: </span>
                        <p className="text-gray-700">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No examples available for this problem.</p>
            )}
          </div>
        )}

        {activeTab === 'solutions' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Solutions</h3>
            </div>
            
            {analysis.solutions && analysis.solutions.length > 0 && analysis.solutions[0] !== "No solutions available" ? (
              <div className="space-y-8">
                {analysis.solutions.map((solution, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium">Approach {index + 1}</h3>
                      <button 
                        onClick={() => copyToClipboard(solution, `solution-${index}`)}
                        className="flex items-center text-gray-500 hover:text-gray-700 text-xs"
                      >
                        {copiedSection === `solution-${index}` ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="prose max-w-none whitespace-pre-wrap">
                        {solution}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No solutions available for this problem yet.</p>
            )}
          </div>
        )}

        {activeTab === 'explanation' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Simplified Explanation</h3>
              <button 
                onClick={() => copyToClipboard(analysis.simplifiedExplanation, 'explanation')}
                className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                {copiedSection === 'explanation' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <p className="text-gray-800 whitespace-pre-line">{analysis.simplifiedExplanation || "No explanation available."}</p>
            </div>
          </div>
        )}

        {activeTab === 'hint' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Hint</h3>
              <button 
                onClick={() => copyToClipboard(analysis.hint, 'hint')}
                className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                {copiedSection === 'hint' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">{analysis.hint || "No hints available for this problem."}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}