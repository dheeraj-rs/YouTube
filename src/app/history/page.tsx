'use client';

import { VideoCard } from '@/components/VideoCard';
import { useStore } from '@/store/useStore';

export default function HistoryPage() {
  const { watchHistory } = useStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Watch History</h1>
      {watchHistory.length === 0 ? (
        <p className="text-gray-400">No videos in watch history</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchHistory.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}