// app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Code, Github, HomeIcon, User } from "lucide-react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FaadDoDSA",
  description:
    "Analyze data structure and algorithm questions with AI assistance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/x-icon" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-gray-950 flex flex-col`}
      >
        {/* Navigation - Now properly sticky */}
        <header className="bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-800">
          <div className="container mx-auto  py-4">
            <div className="flex items-center justify-between px-3 md:mx-1">
              <Link href="/" className="flex items-center space-x-3">
                {/* <Code className="h-9 w-9 text-amber-500" /> */}
                <Image
                  src="/icon.png" // Image placed inside the public folder
                  alt="App logo"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-extrabold text-white">
                    FaadDo<span className="text-amber-500">DSA</span>
                  </h1>
                </div>
              </Link>

              <nav className="hidden md:flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center text-gray-300 hover:text-amber-500 px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200"
                >
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Home
                </Link>
                <Link
                  href="https://github.com/lokeshbhai007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-amber-500 px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
                <Link
                  href="https://leetcode.com/problemset/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-amber-500 px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200"
                >
                  <User className="h-4 w-4 mr-2" />
                  Leetcode
                </Link>
              </nav>

              {/* Mobile menu button - can be expanded with a dropdown implementation */}
              <button className="md:hidden flex items-center p-2 rounded-md text-gray-300 hover:text-amber-500 hover:bg-gray-800">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main content - grows to fill available space */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                {/* <Code className="h-5 w-5 text-amber-500 mr-2" /> */}
                <Image
                  src="/icon.png" // Image placed inside the public folder
                  alt="App logo"
                  width={25}
                  height={20}
                  className="rounded-lg shadow-lg mr-2"
                />
                <p className="text-gray-300 text-sm">
                  © {new Date().getFullYear()} Faad-Do-DSA
                </p>
              </div>

              <div className="flex space-x-6">
                <Link
                  href="/"
                  className="text-gray-400 hover:text-amber-500 text-sm transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-amber-500 text-sm transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-amber-500 text-sm transition-colors duration-200"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-amber-500 text-sm transition-colors duration-200"
                >
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
