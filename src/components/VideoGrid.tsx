'use client';

import { VideoCard } from '@/components/VideoCard';
import { useApp } from '@/providers/AppProvider';
import { videos } from '@/data';

export function VideoGrid() {
  const { selectedCategory, isSidebarOpen, isMobile } = useApp();
  
  const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="px-4 pb-4">
      <div className={`grid gap-4 transition-all duration-300 ease-in-out ${
        isSidebarOpen && !isMobile
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      }`}>
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}