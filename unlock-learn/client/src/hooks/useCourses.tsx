import { useQuery } from '@tanstack/react-query';
import apiCall from '@/lib/api'; // Adjust the import path if necessary

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const data = await apiCall('/courses'); // Adjust the endpoint as necessary
      return data;
    },
  });
};

export const useCourse = (courseId: string) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const data = await apiCall(`/courses/${courseId}`); // Adjust the endpoint as necessary
      return data;
    },
    enabled: !!courseId,
  });
};

export const useEnrollments = () => {
  return useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const data = await apiCall('/course_enrollments'); // Adjust the endpoint as necessary
      return data;
    },
  });
};