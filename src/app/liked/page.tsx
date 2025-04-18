'use client';

import { VideoCard } from '@/components/VideoCard';
import { useStore } from '@/store/useStore';

export default function LikedVideosPage() {
  const { likedVideos } = useStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>
      {likedVideos.length === 0 ? (
        <p className="text-gray-400">No liked videos</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {likedVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}