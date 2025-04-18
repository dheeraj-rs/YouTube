'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Mic, Video, Bell, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchSuggestions } from './SearchSuggestions';
import { useApp } from '@/providers/AppProvider';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toggleSidebar } = useApp();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-dark z-50 flex flex-col">
      <div className="h-14 px-4 flex items-center justify-between gap-4">
        {!isSearchOpen ? (
          <>
            <div className="flex items-center gap-4 min-w-fit">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-dark-surface rounded-full transition-colors duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="flex items-center gap-1">
                <span className="text-2xl font-semibold text-red-600">▶</span>
                <span className="text-xl font-semibold hidden sm:inline">Premium</span>
                <span className="text-xs align-top hidden sm:inline">IN</span>
              </Link>
            </div>

            <div
              ref={searchContainerRef}
              className="hidden md:flex items-center flex-1 max-w-[720px] relative mx-4"
            >
              <form
                onSubmit={handleSearch}
                className="flex flex-1 min-w-0"
              >
                <div className="flex flex-1 min-w-0">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full px-4 py-2 bg-[#121212] text-white border-[1px] border-dark-border rounded-l-full focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    className="px-6 bg-dark-surface border-[1px] border-l-0 border-dark-border rounded-r-full hover:bg-[#313131] transition-colors duration-200"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
              <button type="button" className="p-2 ml-4 hover:bg-dark-surface rounded-full transition-colors duration-200">
                <Mic className="w-5 h-5" />
              </button>

              {showSuggestions && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1">
                  <SearchSuggestions
                    query={searchQuery}
                    onSelect={handleSearchClick}
                    onClose={() => setShowSuggestions(false)}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 min-w-fit">
              <button 
                className="md:hidden p-2 hover:bg-dark-surface rounded-full transition-colors duration-200"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-dark-surface rounded-full hidden sm:block transition-colors duration-200">
                <Video className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-dark-surface rounded-full transition-colors duration-200">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-dark-surface rounded-full transition-colors duration-200">
                <User className="w-6 h-6" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4 w-full px-2">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 hover:bg-dark-surface rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 relative" ref={searchContainerRef}>
              <form onSubmit={handleSearch} className="flex items-center gap-4">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full px-4 py-2 bg-[#121212] text-white border-[1px] border-dark-border rounded-full focus:outline-none focus:border-blue-500 transition-colors duration-200"
                />
                <button type="submit" className="absolute right-14 p-2">
                  <Search className="w-5 h-5" />
                </button>
              </form>
              {showSuggestions && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1">
                  <SearchSuggestions
                    query={searchQuery}
                    onSelect={handleSearchClick}
                    onClose={() => setShowSuggestions(false)}
                  />
                </div>
              )}
            </div>
            <button className="p-2 hover:bg-dark-surface rounded-full transition-colors duration-200">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}