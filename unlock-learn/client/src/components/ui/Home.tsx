// src/pages/Home.tsx
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Play, Check, Globe, Download, Captions, Users, BookOpen, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const featuredCourses = [
    {
      id: 1,
      category: "Technology",
      level: "beginner",
      title: "Digital Literacy for Beginners",
      description: "Master essential digital skills including computer basics, internet navigation, email, and online safety...",
      duration: "8h",
      price: "Free",
      features: ["10 hours of content", "0 lessons", "Certificate of completion"]
    },
    {
      id: 2,
      category: "Programming",
      level: "beginner", 
      title: "Introduction to Coding with Python",
      description: "Learn programming fundamentals with Python, the most beginner-friendly language for aspiring...",
      duration: "12h",
      price: "Free",
      features: ["12 hours of content", "0 lessons", "Certificate of completion"]
    },
    {
      id: 3,
      category: "Study Skills",
      level: "beginner",
      title: "Effective Online Learning Skills",
      description: "Develop strategies for successful online education, time management, and self-directed learning.",
      duration: "6h",
      price: "Free",
      features: ["6 hours of content", "0 lessons", "Certificate of completion"]
    },
    {
      id: 4,
      category: "Security",
      level: "beginner",
      title: "Internet Safety & Cyber Hygiene",
      description: "Protect yourself online with essential cybersecurity practices, privacy settings, and digital wellness.",
      duration: "5h",
      price: "Free",
      features: ["5 hours of content", "0 lessons", "Certificate of completion"]
    },
    {
      id: 5,
      category: "Soft Skills",
      level: "beginner",
      title: "Communication Skills for Global Learners",
      description: "Enhance your verbal and written communication for international collaboration and success.",
      duration: "10h",
      price: "Free",
      features: ["10 hours of content", "0 lessons", "Certificate of completion"]
    },
    {
      id: 6,
      category: "Mathematics",
      level: "beginner",
      title: "Basic Mathematics Refresher",
      description: "Review fundamental math concepts from arithmetic to basic algebra for everyday use and further learning.",
      duration: "15h",
      price: "Free",
      features: ["15 hours of content", "0 lessons", "Certificate of completion"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Accessible Education for <span className="text-blue-600">Everyone</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empowering learners of all abilities with inclusive, accessible courses designed for special needs education and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
              onClick={() => navigate('/courses')}
            >
              Start Learning Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Active Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Accessible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Built for Accessibility</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            We believe education should be available to everyone, regardless of ability.
            Our platform is designed with inclusive features from the ground up.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-lg">
                  <Globe className="w-6 h-6 text-blue-600" />
                  WCAG 2.1 AA Compliant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Built with accessibility at the core. Screen reader support, keyboard navigation, and high contrast modes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-lg">
                  <Captions className="w-6 h-6 text-blue-600" />
                  Audio & Captions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every video includes professional captions and text-to-speech support for all content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-lg">
                  <Download className="w-6 h-6 text-blue-600" />
                  Offline Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Download courses and learn anywhere, even without internet connectivity.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Certificates</h2>
              <p className="text-gray-600 text-lg mb-6">
                Earn recognized certificates upon course completion to showcase your achievements.
              </p>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Community Support</h2>
              <p className="text-gray-600 text-lg">
                Join a supportive community of learners and educators dedicated to inclusive education.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Multi-language Support Card */}
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="text-lg">Multi-language Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Learn in your preferred language with UI translations and localized content.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Additional features can be added here */}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {course.category}
                    </span>
                    <span className="text-sm text-gray-500">{course.level}</span>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="mt-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="font-bold text-green-600">{course.price}</span>
                  </div>
                  
                  <div className="space-y-2">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;