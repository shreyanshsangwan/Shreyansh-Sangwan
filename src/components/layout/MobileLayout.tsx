import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, showNav = true }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl overflow-hidden relative flex flex-col">
        <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
          {children}
        </main>
        {showNav && (
          <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
            {/* Navigation items would go here, but for this prototype we might just use simple links */}
            <a href="/" className="flex flex-col items-center text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span className="text-xs mt-1 font-medium">Home</span>
            </a>
            <a href="/tracking" className="flex flex-col items-center text-gray-400 hover:text-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="text-xs mt-1 font-medium">Tracking</span>
            </a>
            <a href="/profile" className="flex flex-col items-center text-gray-400 hover:text-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="text-xs mt-1 font-medium">Profile</span>
            </a>
          </nav>
        )}
      </div>
    </div>
  );
};
