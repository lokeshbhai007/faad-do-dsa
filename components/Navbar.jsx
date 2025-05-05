// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { List, Home, Database } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            FaadDoDSA
          </Link>
          
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Button 
                variant={pathname === '/' ? "secondary" : "ghost"} 
                className="flex items-center gap-2"
              >
                <Home size={18} />
                <span className="hidden md:inline">Home</span>
              </Button>
            </Link>
            
            <Link href="/questions">
              <Button 
                variant={pathname === '/questions' ? "secondary" : "ghost"} 
                className="flex items-center gap-2"
              >
                <List size={18} />
                <span className="hidden md:inline">All Questions</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}