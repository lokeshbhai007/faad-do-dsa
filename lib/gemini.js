// lib/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeQuestion(question) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are a LeetCode expert assisting a developer. Analyze this data structure and algorithm question:
"${question}"

Return your response in a structured JSON format. For each section, provide data that follows the schema below.
Do not include any text outside of this JSON structure:

{
  "difficulty": "easy|medium|hard",
  "topics": ["Array", "Hash Table", etc],
  "companies": ["Google", "Amazon", etc],
  "description": ""Write only the core problem description in markdown format. Do not include constraints, Focus only on describing the problem clearly and concisely in 3-4 sentence",
  "examples": [
    {
      "input": "input description",
      "output": "expected output",
      "explanation": "explanation of the example"
    }
  ],
  "approaches": [
    {
      "name": "approach name",
      "timeComplexity": "e.g., O(n)",
      "spaceComplexity": "e.g., O(1)",
      "explanation": "brief explanation",
      "properDescribe": "complete solution with line by line analysis and explain",
      "code": "code sample in C++"
    }
  ],
  "simplifiedExplanation": "overall explanation of the problem and approach",
  "solutions": ["complete solution write-up including code and analysis"],
  "hint": "one or more helpful hints without revealing the full solution",
  "similarQuestions": [
    {
      "title": "Question title",
      "difficulty": "easy|medium|hard", 
      "description": "one-line description of the related problem"
    }
  ]
}

For the similarQuestions field, please provide 3-5 similar LeetCode-style questions that use similar algorithmic patterns, data structures, or problem-solving approaches. Each similar question should include a title, difficulty level, and a one-line description.

Ensure each field is properly filled with high-quality, relevant content. If the question is vague, make reasonable assumptions to formulate a complete LeetCode-style problem.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the response as JSON
    try {
      // Find any JSON object in the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonText = jsonMatch[0];
        const parsedResponse = JSON.parse(jsonText);
        
        // Process the JSON response
        return processJsonResponse(parsedResponse, question);
      } else {
        console.error("No valid JSON found in Gemini response");
        throw new Error("Failed to parse structured data from Gemini response");
      }
    } catch (jsonError) {
      console.error("Failed to parse JSON from Gemini response:", jsonError);
      throw new Error(`JSON parsing error: ${jsonError.message}`);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error(`Failed to analyze question: ${error.message}`);
  }
}

function processJsonResponse(parsedJson, originalQuestion) {
  // Create a validated response
  return {
    originalQuestion,
    difficulty: validateDifficulty(parsedJson.difficulty),
    topics: validateArrayField(parsedJson.topics),
    companies: validateArrayField(parsedJson.companies),
    description: parsedJson.description || '',
    examples: validateExamples(parsedJson.examples),
    approaches: validateApproaches(parsedJson.approaches),
    simplifiedExplanation: parsedJson.simplifiedExplanation || '',
    solutions: validateSolutions(parsedJson.solutions),
    hint: parsedJson.hint || '',
    similarQuestions: validateSimilarQuestions(parsedJson.similarQuestions)
  };
}

function validateDifficulty(difficulty) {
  const validDifficulties = ['easy', 'medium', 'hard'];
  const normalizedDifficulty = difficulty?.toLowerCase().trim();
  
  return validDifficulties.includes(normalizedDifficulty) 
    ? normalizedDifficulty 
    : '';
}

function validateArrayField(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  
  // Clean each item and remove empty ones
  return arr.map(item => 
    typeof item === 'string' 
      ? item.replace(/^\*+\s*/, '').trim() 
      : ''
  ).filter(Boolean);
}

function validateExamples(examples) {
  if (!Array.isArray(examples)) {
    return [];
  }
  
  return examples.map(example => ({
    input: example.input || '',
    output: example.output || '',
    explanation: example.explanation || ''
  }));
}

function validateApproaches(approaches) {
  if (!Array.isArray(approaches)) {
    return [];
  }
  
  return approaches.map(approach => ({
    name: approach.name || '',
    timeComplexity: approach.timeComplexity || '',
    spaceComplexity: approach.spaceComplexity || '',
    explanation: approach.explanation || '',
    properDescribe: approach.properDescribe || '',
    code: approach.code || ''
  }));
}

function validateSolutions(solutions) {
  if (!Array.isArray(solutions)) {
    return [];
  }
  
  // Convert any solution objects to strings
  return solutions.map(solution => {
    if (typeof solution === 'object') {
      return JSON.stringify(solution);
    }
    return solution || '';
  });
}

function validateSimilarQuestions(similarQuestions) {
  if (!Array.isArray(similarQuestions)) {
    return [];
  }
  
  return similarQuestions.map(question => ({
    title: question.title || '',
    difficulty: validateDifficulty(question.difficulty),
    description: question.description || ''
  }));
}