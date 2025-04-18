import { CategoryPills } from '@/components/CategoryPills';
import { VideoGrid } from '@/components/VideoGrid';

export default function Home() {
  return (
    <div className="max-w-[2400px] mx-auto">
      <div className="sticky top-0 z-10 bg-dark pb-4">
        <CategoryPills />
      </div>
      <VideoGrid />
    </div>
  );
}