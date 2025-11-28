import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Play, Globe, Download, Captions } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary-50)] to-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Accessible Education for <span className="text-[var(--primary-600)]">Everyone</span>
          </h1>
          <p className="text-xl text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            Empowering learners of all abilities with inclusive, accessible courses designed for special needs education and
            beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white px-8 py-3 text-lg"
              onClick={() => navigate('/courses')}
              aria-label="Browse courses"
            >
              Start Learning Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[var(--primary-600)] text-[var(--primary-600)] hover:bg-[var(--primary-50)] px-8 py-3 text-lg"
              aria-label="Watch platform demo"
            >
              <Play className="w-5 h-5 mr-2" aria-hidden="true" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--card)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--primary-600)] mb-2">10K+</div>
              <div className="text-[var(--muted)]">Active Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--primary-600)] mb-2">500+</div>
              <div className="text-[var(--muted)]">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--primary-600)] mb-2">98%</div>
              <div className="text-[var(--muted)]">Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--primary-600)] mb-2">100%</div>
              <div className="text-[var(--muted)]">Accessible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Accessibility</h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              We believe education should be available to everyone, regardless of ability. Our platform is designed with
              inclusive features from the ground up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-[var(--primary-600)]" aria-hidden="true" />
                  WCAG 2.1 AA Compliant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Built with accessibility at the core. Screen reader support, keyboard navigation, and high contrast modes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Captions className="w-6 h-6 text-[var(--primary-600)]" aria-hidden="true" />
                  Audio & Captions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every video includes professional captions and text-to-speech support for all content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-6 h-6 text-[var(--primary-600)]" aria-hidden="true" />
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

      {/* Courses Preview Section */}
      <section className="py-16 bg-[var(--card)]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="text-center">
            <Button onClick={() => navigate('/courses')} size="lg">
              Browse All Courses
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
