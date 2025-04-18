import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Video } from '@/types';

interface StoreState {
  watchHistory: Video[];
  likedVideos: Video[];
  addToHistory: (video: Video) => void;
  toggleLikeVideo: (video: Video) => void;
  isVideoLiked: (videoId: string) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      watchHistory: [],
      likedVideos: [],
      addToHistory: (video) => {
        set((state) => ({
          watchHistory: [
            video,
            ...state.watchHistory.filter((v) => v.id !== video.id),
          ],
        }));
      },
      toggleLikeVideo: (video) => {
        set((state) => {
          const isLiked = state.likedVideos.some((v) => v.id === video.id);
          return {
            likedVideos: isLiked
              ? state.likedVideos.filter((v) => v.id !== video.id)
              : [...state.likedVideos, video],
          };
        });
      },
      isVideoLiked: (videoId) => {
        return get().likedVideos.some((v) => v.id === videoId);
      },
    }),
    {
      name: 'youtube-clone-storage',
    }
  )
);