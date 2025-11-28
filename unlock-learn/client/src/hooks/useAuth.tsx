import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";   // ✅ use axios instance with token interceptor

interface User {
  id?: string;
  _id?: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check auth on startup
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // LOGIN
  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      // Save token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setUser(res.data.user);
      toast({ title: "Welcome back!", description: "Signed in successfully." });

      navigate("/");
    } catch (err: any) {
      toast({
        title: "Sign in failed",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      });
    }
  };

  // REGISTER
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        fullName
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setUser(res.data.user);
      toast({ title: "Account created!", description: "Welcome aboard 🎉" });
      navigate("/");
    } catch (err: any) {
      toast({
        title: "Sign up failed",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      });
    }
  };

  // LOGOUT
  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth");
  };

  const signInWithGoogle = async () => {
    // This is handled by GoogleAuthButton component
    toast({ title: "Use Google button", description: "Click the Google sign-in button" });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
