import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { NeonButton } from "@/components/NeonButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or OS preference
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--card)] backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">IL</span>
          </div>
          <span className="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">InclusiveLearn</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium text-[var(--muted)] hover:text-[var(--primary-600)] transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
            Home
          </Link>
          <Link to="/courses" className="font-medium text-[var(--muted)] hover:text-[var(--primary-600)] transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
            Courses
          </Link>
          <Link to="/about" className="font-medium text-[var(--muted)] hover:text-[var(--primary-600)] transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
            About
          </Link>
          <Link to="/contact" className="font-medium text-[var(--muted)] hover:text-[var(--primary-600)] transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
            Contact
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-[var(--muted)] hover:text-[var(--foreground)]"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)]">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.fullName || user.email} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {(user.fullName || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden md:inline">{user.fullName || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    {t('nav.settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth">
                <NeonButton variant="ghost">
                  Sign In
                </NeonButton>
              </Link>
              <Link to="/auth">
                <NeonButton variant="cyan">
                  Get Started
                </NeonButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-[var(--primary-50)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--card)] w-full">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium py-2 hover:text-[var(--primary-600)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="font-medium py-2 hover:text-[var(--primary-600)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="font-medium py-2 hover:text-[var(--primary-600)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="font-medium py-2 hover:text-[var(--primary-600)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 border-t border-[var(--border)] space-y-3">
              <Button
                variant="outline"
                className="w-full bg-blue-100 border-blue-400 text-blue-600 hover:bg-blue-200"
                onClick={toggleTheme}
                aria-pressed={isDark}
                aria-label="Toggle theme"
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </Button>

              {user ? (
                <>
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.fullName || user.email} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {(user.fullName || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{user.fullName || user.email}</p>
                      <p className="text-sm text-[var(--muted)] truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <NeonButton variant="ghost" className="w-full">Profile</NeonButton>
                  </Link>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <NeonButton variant="cyan" className="w-full">Dashboard</NeonButton>
                  </Link>
                  <NeonButton variant="magenta" className="w-full" onClick={signOut}>
                    Sign Out
                  </NeonButton>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <NeonButton variant="ghost" className="w-full">
                      Sign In
                    </NeonButton>
                  </Link>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <NeonButton variant="cyan" className="w-full">
                      Get Started
                    </NeonButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
