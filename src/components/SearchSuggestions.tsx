'use client';

import { Search, Clock, TrendingUp } from 'lucide-react';
import { videos } from '@/data';

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export function SearchSuggestions({ query, onSelect, onClose }: SearchSuggestionsProps) {
  const getSearchSuggestions = (searchQuery: string) => {
    if (!searchQuery.trim()) return [];

    const searchTerms = searchQuery.toLowerCase().split(' ');
    const matchedVideos = videos.filter(video => {
      const title = video.title.toLowerCase();
      const category = video.category.toLowerCase();
      const description = (video.description || '').toLowerCase();
      
      return searchTerms.every(term => 
        title.includes(term) || 
        category.includes(term) || 
        description.includes(term)
      );
    });

    const suggestions = [
      ...matchedVideos.map(v => v.title),
      `${searchQuery} tutorial`,
      `${searchQuery} 2024`,
      `${searchQuery} latest`,
    ];

    return Array.from(new Set(suggestions)).slice(0, 10);
  };

  const suggestions = getSearchSuggestions(query);

  if (suggestions.length === 0) {
    return (
      <div className="absolute left-0 right-0 bg-[#212121] border border-[#303030] rounded-xl shadow-lg overflow-hidden z-50 py-2">
        <div className="px-4 py-2 text-gray-400">
          No results found. Try different keywords.
        </div>
      </div>
    );
  }

  return (
    <div 
      className="absolute left-0 right-0 bg-[#212121] border border-[#303030] rounded-xl shadow-lg overflow-hidden z-50"
      style={{ width: 'calc(100% - 2rem)' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-2">
        {suggestions.map((suggestion, index) => {
          let Icon = Search;
          if (index % 3 === 1) Icon = Clock;
          if (index % 3 === 2) Icon = TrendingUp;

          return (
            <button
              key={index}
              className="flex items-center gap-4 w-full px-4 py-2 hover:bg-[#303030] text-left transition-colors"
              onClick={() => onSelect(suggestion)}
            >
              <Icon className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate">{suggestion}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}