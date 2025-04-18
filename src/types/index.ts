export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  channel: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  views: string;
  uploadedAt: string;
  duration: string;
  category: string;
  description?: string;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}