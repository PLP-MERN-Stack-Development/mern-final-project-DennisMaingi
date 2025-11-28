import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { CompactCourseCard } from '@/components/CompactCourseCard';
import { api } from '@/lib/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course: any) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'free' && course.price === 0) ||
                        (priceFilter === 'paid' && course.price > 0);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-900 text-xl">Loading courses...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-16 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">Course Catalogue</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">Discover inclusive learning paths designed for every ability and learning style</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow-md py-6">
          <div className="max-w-7xl mx-auto px-6">
            <input
              type="text"
              placeholder="Search courses by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-2xl px-4 py-3 border-2 border-gray-200 rounded-lg mb-6 focus:border-indigo-500 focus:outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Security">Security</option>
                  <option value="Special Needs">Special Needs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free Only</option>
                  <option value="paid">Paid Only</option>
                </select>
              </div>
              <div className="text-right text-gray-600 font-medium">
                {filteredCourses.length} of {courses.length} courses
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', justifyItems: 'stretch', alignItems: 'start'}}>
              {filteredCourses.map((course: any) => (
                <CompactCourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
