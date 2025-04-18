'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<number>();

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          console.log('Autoplay prevented');
        });
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link 
      href={`/watch/${video.id}`}
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-dark-surface">
        {isHovered ? (
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 rounded text-xs">
          {video.duration}
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <img
          src={video.channel.avatar}
          alt={video.channel.name}
          className="h-9 w-9 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 overflow-hidden">
          <h3 className="font-medium line-clamp-2 text-sm leading-5">
            {video.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
            <span className="line-clamp-1">{video.channel.name}</span>
            {video.channel.verified && (
              <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-400">
            {video.views} views • {video.uploadedAt}
          </p>
        </div>
      </div>
    </Link>
  );
}