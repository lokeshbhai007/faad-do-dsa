'use client'

import { useEffect, useState } from 'react';
import Link from "next/link";
import QuestionForm from "@/components/QuestionForm";
import { List, Code, Sparkles } from "lucide-react";

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
      
      {/* Floating code particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="absolute opacity-15 text-cyan-50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          suppressHydrationWarning
        >
          {Math.random() > 0.5 ? '{...}' : '</>'}
        </div>
      ))}
      
      {/* Glowing orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div 
          key={`orb-${i}`}
          className="absolute rounded-full bg-blue-500 blur-3xl opacity-5"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 100}px`,
            height: `${50 + Math.random() * 100}px`,
            animation: 'pulse 5s infinite',
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  );
};

// Animated Title Component
const AnimatedTitle = () => {
  return (
    <div className="relative mb-3 text-center">
      {/* <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
        Algorithm
        <span className="relative mx-2">
          <Sparkles className="h-8 w-8 text-blue-400 inline" />
        </span>
        Analyzer
      </h1> */}
      {/* <p className="text-blue-200 text-lg">Optimize your coding solutions with AI analysis</p> */}
    </div>
  );
};

// This is a Client Component now
export default function Home() {
  // Add a loading state for entrance animation
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after a short delay for entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <div className={`container mx-auto px-4 py-12 relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <AnimatedTitle />
        
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {/* Main form area with animation */}
          <div className="w-full transform transition-all duration-700">
            <QuestionForm />
          </div>
          
          {/* Navigation Button with hover effect */}
          <div className="w-full">
            <Link
              href="/all-questions"
              className="flex items-center justify-center p-4 bg-blue-900 bg-opacity-40 text-blue-200 rounded-lg shadow-lg border border-blue-700 border-opacity-50 hover:bg-blue-800 hover:bg-opacity-60 transition-all duration-300"
            >
              <List className="h-5 w-5 mr-2" />
              <span className="font-medium">View All Previous Questions</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0px) rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.03;
            transform: scale(1);
          }
          50% {
            opacity: 0.08;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.03;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}