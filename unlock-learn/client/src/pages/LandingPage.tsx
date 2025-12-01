import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle, Star, Users, BookOpen, Accessibility, Globe, Headphones, Download, Award, UsersRound } from "lucide-react";

import { NeonButton } from "@/components/NeonButton";

/* ────────────────────────────────────────────── */
/* Navbar */
/* ────────────────────────────────────────────── */
const Navbar = () => (
  <header className="py-6 bg-[#1e2139]">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">InclusiveLearn</h1>
      <nav className="hidden md:flex gap-8">
        <a className="text-gray-300 hover:text-white transition-colors" href="#features">Features</a>
        <a className="text-gray-300 hover:text-white transition-colors" href="#courses">Courses</a>
        <a className="text-gray-300 hover:text-white transition-colors" href="#testimonials">Testimonials</a>
      </nav>
      <NeonButton variant="cyan">Login</NeonButton>
    </div>
  </header>
);

/* ────────────────────────────────────────────── */
/* Hero Section */
/* ────────────────────────────────────────────── */
const Hero = () => (
  <section className="relative overflow-hidden bg-[#1e2139] text-white min-h-screen flex items-center">
    <div className="container mx-auto px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div className="space-y-10">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1]">
            Accessible<br/>Education for
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
            Empowering learners of all abilities with inclusive, accessible courses designed for special needs education and beyond.
          </p>

          <div className="flex items-center gap-6">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 transition-all hover:scale-105">
              Start Learning Free
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-3 text-white text-lg font-semibold hover:text-indigo-400 transition-colors">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <Play className="h-5 w-5 ml-1" fill="white" />
              </div>
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12">
            <Stat value="10K+" label="Active Learners" />
            <Stat value="500+" label="Courses" />
            <Stat value="98%" label="Satisfaction" />
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop" alt="Students learning" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* Stat Component */
const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="text-4xl md:text-5xl font-bold text-indigo-400">{value}</div>
    <div className="text-base text-gray-400 mt-1">{label}</div>
  </div>
);

/* ────────────────────────────────────────────── */
/* Features */
/* ────────────────────────────────────────────── */
const Features = () => (
  <section id="features" className="py-20 bg-[#0d1117]">
    <div className="container mx-auto px-8 max-w-7xl">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Feature
          icon={<Accessibility className="h-7 w-7 text-indigo-400" />}
          title="WCAG 2.1 AA Compliant"
          description="Built with accessibility at the core. Screen reader support, keyboard navigation, and high contrast modes."
        />
        <Feature
          icon={<Globe className="h-7 w-7 text-indigo-400" />}
          title="Multi-language Support"
          description="Learn in your preferred language with UI translations and localized content."
        />
        <Feature
          icon={<Headphones className="h-7 w-7 text-indigo-400" />}
          title="Audio & Captions"
          description="Every video includes professional captions and text-to-speech support for all content."
        />
        <Feature
          icon={<Download className="h-7 w-7 text-indigo-400" />}
          title="Offline Learning"
          description="Download courses and learn anywhere, even without internet connectivity."
        />
        <Feature
          icon={<Award className="h-7 w-7 text-indigo-400" />}
          title="Certificates"
          description="Earn recognized certificates upon course completion to showcase your achievements."
        />
        <Feature
          icon={<UsersRound className="h-7 w-7 text-indigo-400" />}
          title="Community Support"
          description="Join a supportive community of learners and educators dedicated to inclusive education."
        />
      </div>
    </div>
  </section>
);

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-8 bg-[#161b22] rounded-xl border border-[#21262d] hover:border-[#30363d] transition-all">
    <div className="w-12 h-12 bg-[#1f2937] rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-[#8b949e] text-[15px] leading-relaxed">{description}</p>
  </div>
);

/* ────────────────────────────────────────────── */
/* Courses Preview */
/* ────────────────────────────────────────────── */
const CoursesPreview = () => (
  <section id="courses" className="py-24 bg-white">
    <div className="container mx-auto px-4 text-center space-y-14">
      <h2 className="text-4xl font-bold text-gray-900">Popular Courses</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          "Special Needs Teaching Basics",
          "Assistive Technology in Education",
          "Inclusive Classroom Strategies",
        ].map((course) => (
          <div
            key={course}
            className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-900">{course}</h3>
            <p className="text-gray-600 mt-2">
              Practical, hands-on lessons to support learners with diverse needs.
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ────────────────────────────────────────────── */
/* Testimonials */
/* ────────────────────────────────────────────── */
const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-gray-50">
    <div className="container mx-auto px-4 text-center space-y-14">
      <h2 className="text-4xl font-bold text-gray-900">Loved by Learners Worldwide</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Amina", text: "This platform changed how I learn. InclusiveLearn is amazing!" },
          { name: "James", text: "My special needs students improved significantly." },
          { name: "Sophia", text: "The accessibility tools are the best I've seen!" },
        ].map((t, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <Star className="h-6 w-6 text-yellow-500 mx-auto" />
            <p className="mt-4 italic text-gray-700">"{t.text}"</p>
            <h4 className="mt-4 font-semibold text-gray-900">{t.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ────────────────────────────────────────────── */
/* Call To Action */
/* ────────────────────────────────────────────── */
const CTA = () => (
  <section className="py-24 text-center bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-gray-900">Start Learning Today</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
        Join thousands of learners accessing high-quality, inclusive education.
      </p>
      <NeonButton variant="cyan" className="mt-8">
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </NeonButton>
    </div>
  </section>
);

/* ────────────────────────────────────────────── */
/* Footer */
/* ────────────────────────────────────────────── */
const Footer = () => (
  <footer className="py-10 border-t bg-gray-50 border-gray-200">
    <div className="container mx-auto px-4 text-center text-gray-600">
      © {new Date().getFullYear()} InclusiveLearn — All rights reserved.
    </div>
  </footer>
);

/* ────────────────────────────────────────────── */
/* Final Page Export */
/* ────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CoursesPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
