import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  getProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Backend base URL
  const API_URL = "http://localhost:5000/api/auth";

  useEffect(() => {
    // Auto-login if token exists
    const token = localStorage.getItem('token');
    if (token) {
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch user profile
  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Profile fetch error:", error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Sign Up
  const signUp = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/register`, { name, email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      toast({ title: 'Account created!', description: 'Welcome to the platform.' });
      navigate('/');
    } catch (err: any) {
      toast({
        title: 'Sign up failed',
        description: err.response?.data?.message || 'Something went wrong.',
        variant: 'destructive',
      });
    }
  };

  // ✅ Sign In
  const signIn = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      toast({ title: 'Welcome back!', description: 'Successfully signed in.' });
      navigate('/');
    } catch (err: any) {
      toast({
        title: 'Sign in failed',
        description: err.response?.data?.message || 'Invalid credentials.',
        variant: 'destructive',
      });
    }
  };

  // ✅ Sign Out
  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast({ title: 'Signed out', description: 'You have been logged out.' });
    navigate('/auth');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
