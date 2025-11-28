import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIChatbot } from '@/components/AIChatbot';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={`min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col`}> 
      <Header />
      <main id="main-content" className={`flex-1 ${className ?? ''}`}>
        {children}
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Layout;
