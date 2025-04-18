'use client';

import { Home, Film, PlaySquare, Music, History, Clock, ThumbsUp, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useApp } from '@/providers/AppProvider';

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar, isMobile } = useApp();
  
  const sidebarLinks = [
    { icon: Home, text: 'Home', path: '/' },
    { icon: Film, text: 'Shorts', path: '/shorts' },
    { icon: PlaySquare, text: 'Subscriptions', path: '/subscriptions' },
    { icon: Music, text: 'YouTube Music', path: '/music' }
  ];

  const userLinks = [
    { icon: History, text: 'History', path: '/history' },
    { icon: Clock, text: 'Watch Later', path: '/watch-later' },
    { icon: ThumbsUp, text: 'Liked Videos', path: '/liked' }
  ];

  const subscriptions = [
    { name: 'JISMA & VIMAL', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100' },
    { name: 'CallMeShazzam', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100' },
    { name: 'ARISTOTLE SECOND', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100' }
  ];

  const sidebarWidth = isSidebarOpen ? 'w-60' : 'w-[72px]';
  const mobileWidth = 'w-64';

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed top-14 bg-dark overflow-y-auto transition-all duration-300 ease-in-out z-40",
        isMobile ? (
          isSidebarOpen
            ? `translate-x-0 ${mobileWidth}`
            : `-translate-x-full ${mobileWidth}`
        ) : (
          `translate-x-0 ${sidebarWidth}`
        ),
        "h-[calc(100vh)] scrollbar-hide"
      )}>
        <nav className="p-3">
          {isMobile && isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="absolute top-2 right-2 p-2 hover:bg-dark-surface rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          <div className="space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={isMobile ? toggleSidebar : undefined}
                className={clsx(
                  "flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-dark-surface transition-colors duration-200",
                  pathname === link.path && "bg-dark-surface",
                  !isSidebarOpen && !isMobile && "justify-center px-2"
                )}
              >
                <link.icon className="w-6 h-6 shrink-0" />
                {(isSidebarOpen || isMobile) && <span className="text-sm">{link.text}</span>}
              </Link>
            ))}
          </div>

          {(isSidebarOpen || isMobile) && (
            <>
              <div className="mt-8 pt-6 border-t border-dark-border space-y-2">
                <h2 className="px-3 mb-4 text-sm font-medium">You</h2>
                {userLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={isMobile ? toggleSidebar : undefined}
                    className={clsx(
                      "flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-dark-surface transition-colors duration-200",
                      pathname === link.path && "bg-dark-surface"
                    )}
                  >
                    <link.icon className="w-6 h-6 shrink-0" />
                    <span className="text-sm">{link.text}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-dark-border space-y-2">
                <h2 className="px-3 mb-4 text-sm font-medium">Subscriptions</h2>
                {subscriptions.map((sub) => (
                  <Link
                    key={sub.name}
                    href={`/channel/${sub.name}`}
                    onClick={isMobile ? toggleSidebar : undefined}
                    className="flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-dark-surface transition-colors duration-200"
                  >
                    <img src={sub.avatar} alt={sub.name} className="w-6 h-6 rounded-full shrink-0" />
                    <span className="text-sm truncate">{sub.name}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </nav>
      </aside>

      {/* Spacer div to push content */}
      {!isMobile && (
        <div className={`shrink-0 ${sidebarWidth}`} />
      )}
    </>
  );
}