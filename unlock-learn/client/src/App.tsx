// App.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";

import './i18n/config';

const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Courses = lazy(() => import("./pages/Courses"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Settings = lazy(() => import("./pages/Settings"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Support = lazy(() => import("./pages/Support"));
const Community = lazy(() => import("./pages/Community"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Learn = lazy(() => import("./pages/Learn"));
const PasswordResetRequest = lazy(() => import("./pages/PasswordResetRequest"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const CheckoutCancel = lazy(() => import("./pages/CheckoutCancel"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CourseContent = lazy(() => import("./pages/CourseContent"));
const Profile = lazy(() => import("./pages/Profile"));

import { AIChatbot } from "./components/AIChatbot";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        <Suspense fallback={<div className="min-h-[40vh] grid place-items-center text-[var(--muted)]">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/password-reset-request" element={<PasswordResetRequest />} />
          <Route path="/auth/reset-password" element={<PasswordReset />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Protected Routes */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Courses Routes */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route
            path="/courses/:id/content"
            element={
              <ProtectedRoute>
                <CourseContent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/learn/:id"
            element={
              <ProtectedRoute>
                <Learn />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          <Route path="/support" element={<Support />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <AIChatbot />
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;