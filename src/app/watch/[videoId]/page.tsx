'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThumbsUp, ThumbsDown, Share, Award, Volume2, VolumeX, Maximize2, Play, Pause } from 'lucide-react';
import { VideoCard } from '@/components/VideoCard';
import { Comments } from '@/components/Comments';
import { videos } from '@/data';
import { useStore } from '@/store/useStore';
import { useApp } from '@/providers/AppProvider';

export default function WatchPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  const video = videos.find(v => v.id === videoId);
  const recommendedVideos = videos.filter(v => v.id !== videoId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  
  const { addToHistory, toggleLikeVideo, isVideoLiked } = useStore();
  const { toggleSidebar, setIsSidebarOpen, toggleOverlaySidebar } = useApp();

  useEffect(() => {
    // Auto-close sidebar when video page opens
    setIsSidebarOpen(false);
    toggleOverlaySidebar();
    
    if (video) {
      addToHistory(video);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [video, addToHistory, setIsSidebarOpen]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => setCurrentTime(videoElement.currentTime);
    const handleDurationChange = () => setDuration(videoElement.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('durationchange', handleDurationChange);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('durationchange', handleDurationChange);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleVideoClick = (e: React.MouseEvent) => {
    const now = Date.now();
    const timeDiff = now - lastClickTime;
    
    if (timeDiff < 300) { // Double click detected
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      
      // Increment click count for progressive skip
      setClickCount(prev => prev + 1);
      const skipTime = Math.min(10 * clickCount, 30); // Max 30 seconds skip
      
      if (x > width / 2) {
        // Right side - skip forward
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            videoRef.current.currentTime + skipTime,
            duration
          );
        }
      } else {
        // Left side - skip backward
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(
            videoRef.current.currentTime - skipTime,
            0
          );
        }
      }
      
      // Reset click count after a delay
      setTimeout(() => setClickCount(0), 1000);
    } else {
      togglePlay();
    }
    
    setLastClickTime(now);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isPlaying) return;
      setShowControls(false);
    }, 2000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!video) return <div>Video not found</div>;

  const isLiked = isVideoLiked(video.id);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-[2400px] mx-auto">
      <div className="flex-1 min-w-0">
        <div 
          ref={videoContainerRef}
          className="relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
          onDoubleClick={toggleFullscreen}
        >
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnail}
            className="w-full h-full object-contain"
            onClick={handleVideoClick}
          />
          
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-2">
                <div className="text-white text-sm flex w-24">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f00 ${(currentTime / duration) * 100}%, #4a4a4a ${(currentTime / duration) * 100}%)`,
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={togglePlay} 
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button 
                  onClick={toggleMute} 
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
                <button 
                  onClick={toggleFullscreen} 
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h1 className="text-xl font-bold mb-2">{video.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={video.channel.avatar}
                alt={video.channel.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-medium">{video.channel.name}</h2>
                <p className="text-sm text-gray-400">
                  {video.views} views • {video.uploadedAt}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => toggleLikeVideo(video)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full hover:bg-[#313131] transition-all duration-200 ${
                  isLiked ? 'bg-[#313131]' : 'bg-[#222222]'
                }`}
              >
                <ThumbsUp className={`w-5 h-5 ${isLiked ? 'text-blue-500' : ''}`} />
                <span>895</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#222222] rounded-full hover:bg-[#313131] transition-all duration-200">
                <ThumbsDown className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#222222] rounded-full hover:bg-[#313131] transition-all duration-200">
                <Share className="w-5 h-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#222222] rounded-full hover:bg-[#313131] transition-all duration-200">
                <Award className="w-5 h-5" />
                <span>Thanks</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 bg-[#222222] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{video.views} views</span>
              <span>•</span>
              <span>{video.uploadedAt}</span>
            </div>
            <p className="text-sm whitespace-pre-line">
              {video.description || `Description for ${video.title}. This is a detailed explanation of the video content.`}
            </p>
          </div>

          <Comments videoId={video.id} />
        </div>
      </div>
      
      <div className="w-full lg:w-[400px] flex-shrink-0">
        <div className="space-t-4">
          {recommendedVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}