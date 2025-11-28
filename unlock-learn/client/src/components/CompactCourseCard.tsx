import { Link } from 'react-router-dom';
import { NeonButton } from '@/components/NeonButton';

interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    description: string;
    category: string;
    level: string;
    duration: string | number;
    price: number;
    thumbnail: string;
  };
}

export const CompactCourseCard = ({ course }: CourseCardProps) => {
  const getDurationIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Technology': '💬',
      'Programming': '💬',
      'Study Skills': '☉',
      'Security': '☉',
      'Soft Skills': '☉',
      'Mathematics': '☉',
      'default': '☉'
    };
    return icons[category] || icons.default;
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex flex-col"
      style={{ minHeight: '250px', height: 'fit-content' }}
    >
      <img 
        src={course.thumbnail} 
        alt={course.title}
        className="w-full object-cover"
        style={{ height: '120px' }}
      />
      <div className="p-4 flex flex-col flex-1">
      <div className="text-xs text-gray-600 font-medium capitalize mb-2 tracking-wide">
        {course.category} | {course.level || 'beginner'}
      </div>

      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
        {course.title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2 flex-1">
        {course.description}
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <span>{getDurationIcon(course.category)}</span>
        <span>{course.duration}</span>
      </div>

      <div className="flex justify-between items-center mt-auto">
        {course.price === 0 ? (
          <div className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold">
            Free
          </div>
        ) : (
          <div className="bg-gray-100 text-gray-900 px-3 py-1.5 rounded-md text-sm font-semibold">
            ${course.price}
          </div>
        )}
        <Link to={`/courses/${course._id}`}>
          <NeonButton variant="cyan" className="px-4 py-2 text-sm">
            Start Learning
          </NeonButton>
        </Link>
      </div>
      </div>
    </div>
  );
};
