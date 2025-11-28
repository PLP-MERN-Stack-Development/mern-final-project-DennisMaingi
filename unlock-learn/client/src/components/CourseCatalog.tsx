import { useCourses } from '@/hooks/useCourses';
import CourseCard from './CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

const CourseCatalog = () => {
  const { data, isLoading } = useCourses();

  // 🔥 ensures courses is ALWAYS an array
  const courses = Array.isArray(data) ? data : data?.courses || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-96 rounded-lg" />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">No courses available</h3>
        <p className="text-gray-600">Check back later for new courses</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course._id} {...course} />
      ))}
    </div>
  );
};

export default CourseCatalog;
