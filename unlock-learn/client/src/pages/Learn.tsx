// ...existing code...
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { VideoPlayer } from '@/components/VideoPlayer';
import { QuizInterface } from '@/components/QuizInterface';
import { CertificateDownload } from '@/components/CertificateDownload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCourse } from '@/hooks/useCourses';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, BookOpen, FileText, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import apiCall from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const Learn = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: courseResponse, isLoading } = useCourse(id!);
  const course = courseResponse?.data || courseResponse;
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  useEffect(() => {
    if (showQuiz && id) {
      fetchQuizData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showQuiz, id]);

  const fetchQuizData = async () => {
    setLoadingQuiz(true);
    try {
      // fetch quiz for course
      const quizResp = await apiCall(`/quizzes?courseId=${encodeURIComponent(id!)}`);
      const quiz = Array.isArray(quizResp) ? quizResp[0] : quizResp;
      if (!quiz) {
        setQuizData(null);
        return;
      }

      // fetch questions for quiz
      const questionsResp = await apiCall(
        `/quiz-questions?quizId=${encodeURIComponent(quiz.id)}&order=order_index`
      );
      const questions = Array.isArray(questionsResp) ? questionsResp : [];

      setQuizData({
        ...quiz,
        questions: questions.map((q: any) => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correct_answer: q.correct_answer,
          points: q.points,
        })),
      });
    } catch (error: any) {
      toast({
        title: 'Error loading quiz',
        description: error?.message || 'Failed to load quiz',
        variant: 'destructive',
      });
    } finally {
      setLoadingQuiz(false);
    }
  };

  if (!user) {
    return (
      <Layout className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="mb-4">Please sign in to access course content</p>
            <Button onClick={() => navigate('/auth')} aria-label="Sign in to access course content">Sign In</Button>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout className="container mx-auto px-4 py-12">
        <Skeleton className="h-96 mb-8" />
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Course not found</h2>
            <Button onClick={() => navigate('/courses')} aria-label="Back to courses">Back to Courses</Button>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  const lessons = course.lessons?.sort((a: any, b: any) => a.order_index - b.order_index) || [];
  const currentLesson = lessons[currentLessonIndex];
  const progress = ((completedLessons.size + (quizCompleted ? 1 : 0)) / (lessons.length + 1)) * 100;

  const handleLessonComplete = () => {
    if (currentLesson) {
      setCompletedLessons(new Set([...completedLessons, currentLesson.id]));
      if (currentLessonIndex < lessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
      } else {
        setShowQuiz(true);
      }
    }
  };

  const handleQuizComplete = async (score: number, passed: boolean) => {
    setQuizCompleted(passed);
    if (passed) {
      try {
        const certNumber = `IL-${Date.now()}-${user?.id?.slice(0, 8)}`;
        // create certificate via backend
        const created = await apiCall('/certificates', {
          method: 'POST',
          data: JSON.stringify({
            user_id: user!.id,
            course_id: id!,
            enrollment_id: id!, // replace with real enrollment id if available
            certificate_number: certNumber,
          }),
        });

        if (!created) throw new Error('Failed to create certificate');
        setCourseCompleted(true);
      } catch (error: any) {
        toast({
          title: 'Certificate generation failed',
          description: error?.message || 'Failed to generate certificate',
          variant: 'destructive',
        });
      }
    }
  };

  if (courseCompleted) {
    return (
      <Layout className="container mx-auto px-4 py-12 max-w-3xl">
        <CertificateDownload
          courseName={course.title}
          studentName={user.email || 'Student'}
          completionDate={new Date().toISOString()}
          certificateNumber={`IL-${Date.now()}`}
        />
        <div className="mt-6 flex gap-4">
          <Button onClick={() => navigate('/dashboard')} className="flex-1" aria-label="Back to dashboard">
            Back to Dashboard
          </Button>
          <Button onClick={() => navigate('/courses')} variant="outline" className="flex-1" aria-label="Browse more courses">
            Browse More Courses
          </Button>
        </div>
      </Layout>
    );
  }

  if (showQuiz) {
    if (loadingQuiz) {
      return (
        <Layout className="container mx-auto px-4 py-12 max-w-3xl">
          <Skeleton className="h-96" />
        </Layout>
      );
    }

    if (!quizData) {
      return (
        <Layout className="container mx-auto px-4 py-12 max-w-3xl">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="mb-4">Quiz not available for this course yet</p>
              <Button onClick={() => setShowQuiz(false)} aria-label="Back to lessons">Back to Lessons</Button>
            </CardContent>
          </Card>
        </Layout>
      );
    }

    return (
      <Layout className="container mx-auto px-4 py-12 max-w-3xl">
        <QuizInterface
          quizId={quizData.id}
          title={quizData.title}
          description={quizData.description || 'Complete this assessment to earn your certificate'}
          questions={quizData.questions}
          passingScore={quizData.passing_score}
          onComplete={handleQuizComplete}
        />
      </Layout>
    );
  }

  return (
    <Layout className="container mx-auto px-4 py-6">
      {/* Course Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <Badge variant="outline">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        <Progress value={progress} className="h-2" aria-label="Course progress" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lesson List Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Course Content</CardTitle>
            <CardDescription>{lessons.length} lessons</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-4">
                {lessons.map((lesson: any, index: number) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentLessonIndex === index
                        ? 'bg-[var(--primary-600)] text-white'
                        : 'hover:bg-[var(--primary-50)]'
                    }`}
                    aria-current={currentLessonIndex === index}
                  >
                    <div className="flex items-start gap-2">
                      {completedLessons.has(lesson.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <BookOpen className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{lesson.title}</p>
                        {lesson.duration_minutes && (
                          <p className="text-xs opacity-70">{lesson.duration_minutes} min</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => setShowQuiz(true)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    showQuiz ? 'bg-[var(--primary-600)] text-white' : 'hover:bg-[var(--primary-50)]'
                  }`}
                  disabled={completedLessons.size < lessons.length}
                  aria-disabled={completedLessons.size < lessons.length}
                >
                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Final Assessment</p>
                      <p className="text-xs opacity-70">Quiz</p>
                    </div>
                  </div>
                </button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {currentLesson && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{currentLesson.title}</CardTitle>
                  {currentLesson.description && (
                    <CardDescription>{currentLesson.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <VideoPlayer
                    videoUrl={currentLesson.video_url}
                    title={currentLesson.title}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="content">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="content">
                        <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
                        Lesson Content
                      </TabsTrigger>
                      <TabsTrigger value="notes">
                        <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" />
                        Notes
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="mt-4">
                      <div className="prose dark:prose-invert max-w-none">
                        {currentLesson.content || (
                          <p className="text-[var(--muted)]">
                            Lesson content will be available soon. Watch the video above to learn more.
                          </p>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="notes" className="mt-4">
                      <p className="text-[var(--muted)]">
                        Download lesson notes and resources to continue learning offline.
                      </p>
                      <Button className="mt-4" variant="outline" aria-label="Download notes as PDF">
                        <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                        Download Notes (PDF)
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                  disabled={currentLessonIndex === 0}
                  aria-disabled={currentLessonIndex === 0}
                >
                  Previous Lesson
                </Button>
                <Button onClick={handleLessonComplete} aria-label="Mark lesson complete and continue">
                  {currentLessonIndex === lessons.length - 1
                    ? 'Complete & Take Quiz'
                    : 'Mark Complete & Continue'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Learn;
