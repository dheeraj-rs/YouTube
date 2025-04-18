'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import { Comment } from '@/types';

interface CommentsProps {
  videoId: string;
}

export function Comments({ videoId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: 'Current User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100',
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">{comments.length} Comments</h3>
      
      <form onSubmit={handleAddComment} className="flex gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-dark-surface flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-dark-border px-2 py-1 focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setNewComment('')}
              className="px-4 py-2 rounded-full hover:bg-dark-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 rounded-full bg-blue-500 text-white disabled:opacity-50"
            >
              Comment
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img
              src={comment.avatar}
              alt={comment.user}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.user}</span>
                <span className="text-sm text-gray-400">{comment.timestamp}</span>
              </div>
              <p className="mt-1">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
                  👍 {comment.likes}
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
                  👎
                </button>
                <button className="text-sm text-gray-400 hover:text-white">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}