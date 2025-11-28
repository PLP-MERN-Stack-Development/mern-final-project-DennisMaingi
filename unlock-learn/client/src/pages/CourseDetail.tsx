import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Clock, Users, BookOpen } from 'lucide-react';
import { NeonButton } from '@/components/NeonButton';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data);
      
      if (user && data.price === 0) {
        setIsEnrolled(true);
      }
    } catch (error) {
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    if (!user) {
      toast.error('Please sign in to enroll');
      navigate('/auth');
      return;
    }
    navigate(`/checkout/${id}`);
  };

  if (loading) return <Layout><div className="container mx-auto px-4 py-12 text-center">Loading...</div></Layout>;
  if (!course) return <Layout><div className="container mx-auto px-4 py-12 text-center">Course not found</div></Layout>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <div className="flex gap-2 mb-6">
              <Badge>{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-8">{course.description}</p>
            
            <Card>
              <CardHeader>
                <CardTitle>What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>✓ Master {course.title} fundamentals</li>
                  <li>✓ Build real-world projects</li>
                  <li>✓ Get certificate of completion</li>
                  <li>✓ Lifetime access to course materials</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="text-3xl font-bold">${course.price}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEnrolled || course.price === 0 ? (
                  <NeonButton onClick={() => navigate(`/courses/${id}/content`)} variant="cyan" className="w-full">
                    Access Course Content
                  </NeonButton>
                ) : (
                  <NeonButton onClick={handleEnroll} variant="magenta" className="w-full">
                    Enroll Now
                  </NeonButton>
                )}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    <span>{course.enrolled} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5" />
                    <span>Instructor: {course.instructor}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
