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

export const categories = [
  "All",
  "Music",
  "Mohanlal",
  "4K resolution",
  "Thrillers",
  "Jagathy Sreekumar",
  "Malayalam cinema",
  "Mixes",
  "Dileep",
  "Test drives",
  "Feature Phones",
  "Romantic comedies",
  "Dramedy",
  "Smartphones",
  "Speed",
  "Wildlife",
  "Soundtracks",
  "Animated films"
];

export const videos: Video[] = [
  {
    id: "1",
    title: "മികച്ച Heath Insurance കുറഞ്ഞ ചെലവിൽ എടുക്കാം ! Best Health Insurance in 2025",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    channel: {
      name: "Anurag Talks",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=100",
      verified: true
    },
    views: "40K",
    uploadedAt: "9 days ago",
    duration: "33:01",
    category: "Insurance",
    description: "In this comprehensive guide, we explore the best health insurance options available in 2025. We break down the costs, benefits, and everything you need to know to make an informed decision about your health coverage."
  },
  {
    id: "2",
    title: "അമേരിക്കയുടെ ബ്രഹ്മാസ്ത്രം | B2 Bomber",
    thumbnail: "https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?auto=format&fit=crop&w=1200",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    channel: {
      name: "JR STUDIO Sci-Talk Malayalam",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100",
      verified: true
    },
    views: "28K",
    uploadedAt: "13 hours ago",
    duration: "25:00",
    category: "4K resolution",
    description: "A detailed analysis of America's strategic bomber, the B2. We explore its capabilities, history, and significance in modern warfare."
  },
  {
    id: "3",
    title: "Mix – KSHMR x Tungevaag - Close Your Eyes [Official Lyric Video]",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    channel: {
      name: "KSHMR, K-391, Topic and more",
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=100",
      verified: true
    },
    views: "1.2M",
    uploadedAt: "Updated today",
    duration: "3:42",
    category: "Music",
    description: "Official lyric video for 'Close Your Eyes' by KSHMR x Tungevaag. A perfect blend of electronic and pop music that will keep you dancing all night long."
  },
  {
    id: "4",
    title: "The Art of Wildlife Photography | 4K Documentary",
    thumbnail: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    channel: {
      name: "Nature Lens",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100",
      verified: true
    },
    views: "203K",
    uploadedAt: "2 weeks ago",
    duration: "42:18",
    category: "Wildlife",
    description: "Join us on an incredible journey through the world of wildlife photography. Learn the techniques and secrets from master photographers as they capture nature's most breathtaking moments."
  }
];