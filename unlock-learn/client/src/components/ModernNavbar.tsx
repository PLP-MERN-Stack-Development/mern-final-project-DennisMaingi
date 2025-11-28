import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const ModernNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-lg">
              <span className="text-gray-900 font-bold text-base">IL</span>
            </div>
            <span className="font-semibold text-lg text-white tracking-tight">InclusiveLearn</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Courses
            </Link>
            <Link to="/community" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Community
            </Link>
            <Link to="/support" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Support
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
              <Globe className="w-5 h-5" />
            </Button>
            {user ? (
              <Link to="/dashboard">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 shadow-lg shadow-indigo-500/30">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/10">
            <Link to="/" className="block py-2 text-sm font-medium text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link to="/courses" className="block py-2 text-sm font-medium text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>
              Courses
            </Link>
            <Link to="/community" className="block py-2 text-sm font-medium text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>
              Community
            </Link>
            <Link to="/support" className="block py-2 text-sm font-medium text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>
              Support
            </Link>
            <div className="pt-3 space-y-2">
              {user ? (
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
