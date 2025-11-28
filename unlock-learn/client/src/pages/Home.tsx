// src/pages/Home.tsx
import Layout from '@/components/Layout';
import { Features } from '@/components/Features';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Play, Check, BookOpen } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const featuredCourses: any[] = [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-7xl font-black tracking-tight leading-tight text-gray-900 dark:text-white" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
                Accessible Education for <span className="relative inline-block">
                  <span className="text-blue-600 dark:text-blue-400">Everyone</span>
                  <span className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
                </span>
              </h1>
              
              <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
                Empowering learners of all abilities with inclusive, accessible courses designed for special needs education and beyond.
              </p>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/courses')}
                >
                  Start Learning Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 py-6 text-xl font-bold rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <Card className="p-6 shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex justify-center mb-4">
                <img 
                  src="/src/assets/hero-education.jpg" 
                  alt="Happy diverse students in discussion with smiling faces"
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
              </div>
              <p className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200 italic" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
                "Together We Learn, Together We Grow"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-3" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>10K+</div>
              <div className="text-gray-700 dark:text-gray-300 font-semibold text-lg" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Active Learners</div>
            </Card>
            <Card className="p-6 text-center shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <div className="text-5xl font-extrabold text-purple-600 dark:text-purple-400 mb-3" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>500+</div>
              <div className="text-gray-700 dark:text-gray-300 font-semibold text-lg" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Courses</div>
            </Card>
            <Card className="p-6 text-center shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <div className="text-5xl font-extrabold text-green-600 dark:text-green-400 mb-3" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>98%</div>
              <div className="text-gray-700 dark:text-gray-300 font-semibold text-lg" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Satisfaction</div>
            </Card>
            <Card className="p-6 text-center shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <div className="text-5xl font-extrabold text-orange-600 dark:text-orange-400 mb-3" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>100%</div>
              <div className="text-gray-700 dark:text-gray-300 font-semibold text-lg" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Accessible</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <Card className="p-12 shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 text-center">
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Our Mission</h2>
            <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Breaking down barriers to education and creating opportunities for all learners</p>
          </Card>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Inclusive by Design</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Every feature, every course, every interaction is built with accessibility and inclusion as the foundation.</p>
            </Card>

            <Card className="p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Quality Education</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Expert-led courses that meet international standards while remaining accessible to all learners.</p>
            </Card>

            <Card className="p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Empowerment</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Supporting learners, teachers, and caregivers with the tools and knowledge to succeed together.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use the Features component here */}
      <Features />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <div className="container mx-auto px-6">
          <Card className="p-12 shadow-2xl border-2 border-white/20 bg-white/10 backdrop-blur-lg text-center">
            <h2 className="text-5xl font-extrabold text-white mb-6" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Join 10,000+ Learners Worldwide</h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Whether you're a student, teacher, or caregiver, Inclusive Learning provides the resources and support you need to create positive learning experiences.</p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl"
              onClick={() => navigate('/courses')}
            >
              Get Started Today
            </Button>
          </Card>
        </div>
      </section>


    </Layout>
  );
};

export default Home;
