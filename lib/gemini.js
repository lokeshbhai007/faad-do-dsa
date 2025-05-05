// lib/gemini.js


import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeQuestion(question) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prepare the prompt for LeetCode style analysis
    const prompt = `
      You are a LeetCode expert assisting a developer. Analyze this data structure and algorithm question:
      
      "${question}"
      
      Provide the following sections in your response:
      
      DIFFICULTY: Determine if this is an Easy, Medium, or Hard level problem
      
      TOPICS: List 2-4 relevant data structure/algorithm topics that apply to this question (e.g., Array, Hash Table, Two Pointers)
      
      COMPANIES: List 3-5 tech companies known to ask this type of question (e.g., Google, Amazon, Microsoft)
      
      DESCRIPTION: Format the problem statement in clean markdown with proper formatting for code blocks, emphasis, etc.
      
      EXAMPLES: Provide 3 example test cases with inputs, outputs, and explanations when helpful
      
      SIMPLE_EXPLANATION: Write a simplified explanation in 5-6 lines that a beginner would understand
      
      SOLUTIONS:
      - Provide 2-3 solution approaches with different time/space complexity trade-offs
      - Analyze time and space complexity for each solution approaches using c++ language
      
      HINT: Provide a simple hint that helps solve the problem without giving away the full solution
      
      Format each section with clear headers so I can parse your response.
    `;

    // Get response from Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract the different sections
    const difficulty = extractSection(text, "DIFFICULTY") || "easy";
    const topics = extractArrayItems(extractSection(text, "TOPICS"));
    const companies = extractArrayItems(extractSection(text, "COMPANIES"));
    const description = extractSection(text, "DESCRIPTION");
    const examples = extractExamples(text);
    const simplifiedExplanation = extractSection(text, "SIMPLE_EXPLANATION");
    const solutions = extractSolutions(text);
    const hint = extractSection(text, "HINT");

    return {
      difficulty: difficulty.toLowerCase(),
      topics,
      companies,
      description: description || "No description available",
      examples: examples.length > 0 ? examples : [{input: "No examples available", output: "", explanation: ""}],
      simplifiedExplanation: simplifiedExplanation || "No explanation available",
      solutions: solutions.length > 0 ? solutions : ["No solutions available"],
      hint: hint || "No hint available",
      originalQuestion: question
    };
  } catch (error) {
    console.error("Error analyzing question with Gemini:", error);
    throw new Error(`Failed to analyze question: ${error.message}`);
  }
}

// Helper function to extract a section from the AI response
function extractSection(text, sectionName) {
  const regex = new RegExp(`${sectionName}:?\\s*([\\s\\S]*?)(?=\\n\\n[A-Z_]+:|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

// Helper function to extract array items from a comma or newline separated string
function extractArrayItems(text) {
  if (!text) return [];
  
  // Split by commas or newlines with bullet points
  const items = text.split(/,|\n- |\n•/).map(item => 
    item.trim().replace(/^- |^• /, '')
  ).filter(item => item.length > 0);
  
  return items.length > 0 ? items : ["None specified"];
}

// Helper function to extract examples (which may span multiple lines)
function extractExamples(text) {
  const examplesSection = extractSection(text, "EXAMPLES");
  if (!examplesSection) return [];

  // Try to parse formal examples
  const exampleBlocks = examplesSection.split(/Example \d+:|Example \d+/i).filter(block => block.trim().length > 0);
  
  if (exampleBlocks.length === 0) {
    return [{
      input: "No examples available",
      output: "",
      explanation: ""
    }];
  }
  
  return exampleBlocks.map(block => {
    const inputMatch = block.match(/Input:?\s*(.*?)(?=\n|Output|$)/is);
    const outputMatch = block.match(/Output:?\s*(.*?)(?=\n|Explanation|$)/is);
    const explanationMatch = block.match(/Explanation:?\s*(.*?)(?=\n\n|$)/is);
    
    return {
      input: inputMatch ? inputMatch[1].trim() : "Not specified",
      output: outputMatch ? outputMatch[1].trim() : "Not specified",
      explanation: explanationMatch ? explanationMatch[1].trim() : null
    };
  });
}

// Helper function to extract solutions
function extractSolutions(text) {
  const solutionsSection = extractSection(text, "SOLUTIONS");
  if (!solutionsSection) return [];
  
  // Try to identify different approaches
  const approaches = solutionsSection.split(/Approach \d+:|Solution \d+:|Approach \d+|Solution \d+/i)
    .filter(approach => approach.trim().length > 0)
    .map(approach => approach.trim());
  
  if (approaches.length === 0) {
    const codeBlocks = solutionsSection.match(/```[\s\S]*?```/g);
    if (codeBlocks && codeBlocks.length > 0) {
      return [solutionsSection];
    }
    return ["No detailed solutions available"];
  }
  
  return approaches;
}