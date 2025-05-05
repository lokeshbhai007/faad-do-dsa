// app/layout.js

import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Code, Github, User } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DSA Question Analyzer | Powered by Gemini AI',
  description: 'Analyze data structure and algorithm questions with AI assistance',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        {/* Navigation */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mx-8">
              <Link href="/" className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">FaadDo<span className='text-blue-500'>DSA</span></h1>
                  {/* <p className="text-xs text-gray-500">Powered by Gemini AI</p> */}
                </div>
              </Link>
              
              <nav className="flex items-center space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link 
                  href="https://github.com/lokeshbhai007" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                </Link>
                <Link 
                  href="https://leetcode.com/problemset/"
                  target="_blank"
                  rel="noopener noreferrer"  
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-4 w-4 mr-1" />
                  Leetcode
                </Link>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        {children}
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Code className="h-6 w-6 text-blue-600 mr-2" />
                <p className="text-gray-600">© {new Date().getFullYear()} DSA Analyzer - AI-powered algorithm question analysis</p>
              </div>
              
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-500 hover:text-blue-600 text-sm">
                  Home
                </Link>
                <Link href="/about" className="text-gray-500 hover:text-blue-600 text-sm">
                  About
                </Link>
                <Link href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-blue-600 text-sm">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}