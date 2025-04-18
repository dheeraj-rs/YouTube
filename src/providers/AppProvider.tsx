'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isMobile: boolean;
  overlaySidebar: boolean;
  toggleOverlaySidebar: () => void;
}

const AppContext = createContext<AppContextType>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
  setIsSidebarOpen: () => {},
  selectedCategory: 'All',
  setSelectedCategory: () => {},
  isMobile: false,
  overlaySidebar: false,
  toggleOverlaySidebar: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [overlaySidebar, setOverlaySidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleOverlaySidebar = () => setOverlaySidebar(true);

  return (
    <AppContext.Provider 
      value={{ 
        isSidebarOpen, 
        toggleSidebar,
        setIsSidebarOpen,
        selectedCategory, 
        setSelectedCategory,
        isMobile,
        overlaySidebar,
        toggleOverlaySidebar
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);