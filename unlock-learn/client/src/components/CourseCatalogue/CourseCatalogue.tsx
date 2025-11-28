// src/components/CourseCatalogue/CourseCatalogue.tsx
import React, { useState, useMemo } from 'react';
import { Course, FilterState } from '../../types';
import CourseCard from './CourseCard';
import styles from './CourseCatalogue.module.css';

const CourseCatalogue: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    audience: 'all',
    price: 'all',
    search: ''
  });

  // Sample data with 20+ marketable courses
  const courses: Course[] = [
    // Free Courses
    {
      id: 1,
      title: "Introduction to Accessible Design",
      description: "Learn the fundamentals of creating inclusive digital experiences for all users. Perfect for beginners.",
      category: "beginner",
      audience: "all",
      price: "Free",
      duration: "2 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      featured: true,
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 1247
    },
    {
      id: 2,
      title: "Basic Sign Language for Everyday Communication",
      description: "Essential ASL skills for daily interactions. No prior experience needed.",
      category: "soft-skills",
      audience: "hearing-impaired",
      price: "Free",
      duration: "3 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Michael Chen",
      rating: 4.9,
      students: 2893
    },
    {
      id: 3,
      title: "Mindfulness and Emotional Intelligence Fundamentals",
      description: "Develop self-awareness and emotional regulation skills for personal growth.",
      category: "soft-skills",
      audience: "all",
      price: "Free",
      duration: "1.5 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Dr. Emily Rodriguez",
      rating: 4.7,
      students: 1567
    },

    // Paid Courses - Physical Challenges Focus
    {
      id: 4,
      title: "Advanced Screen Reader Mastery for Professionals",
      description: "Master JAWS, NVDA, and VoiceOver for enhanced productivity and digital accessibility.",
      category: "technical",
      audience: "visually-impaired",
      price: "$49.99",
      duration: "6 hours",
      level: "Advanced",
      image: "/api/placeholder/300/200",
      featured: true,
      instructor: "David Thompson",
      rating: 4.9,
      students: 892
    },
    {
      id: 5,
      title: "Adaptive Physical Education & Wellness",
      description: "Custom exercise routines designed for various physical abilities and mobility levels.",
      category: "health",
      audience: "mobility-challenged",
      price: "$39.99",
      duration: "4 hours",
      level: "Intermediate",
      image: "/api/placeholder/300/200",
      instructor: "Maria Gonzalez",
      rating: 4.6,
      students: 567
    },
    {
      id: 6,
      title: "Voice Control Software Professional Training",
      description: "Master Dragon NaturallySpeaking and voice command navigation for maximum efficiency.",
      category: "technical",
      audience: "mobility-challenged",
      price: "$59.99",
      duration: "5 hours",
      level: "Intermediate",
      image: "/api/placeholder/300/200",
      instructor: "Robert Wilson",
      rating: 4.7,
      students: 423
    },

    // Soft Skills Courses
    {
      id: 7,
      title: "Effective Communication Strategies for Career Growth",
      description: "Enhance your verbal, non-verbal, and written communication skills for professional success.",
      category: "soft-skills",
      audience: "all",
      price: "$29.99",
      duration: "3 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Lisa Patterson",
      rating: 4.8,
      students: 2104
    },
    {
      id: 8,
      title: "Leadership and Inclusive Team Management",
      description: "Develop leadership qualities and team management skills for diverse workplaces.",
      category: "soft-skills",
      audience: "all",
      price: "$79.99",
      duration: "8 hours",
      level: "Advanced",
      image: "/api/placeholder/300/200",
      instructor: "James Peterson",
      rating: 4.9,
      students: 1345
    },
    {
      id: 9,
      title: "Conflict Resolution and Negotiation Workshop",
      description: "Learn proven techniques to resolve conflicts effectively in personal and professional settings.",
      category: "soft-skills",
      audience: "all",
      price: "$34.99",
      duration: "2.5 hours",
      level: "Intermediate",
      image: "/api/placeholder/300/200",
      instructor: "Dr. Amanda Lee",
      rating: 4.7,
      students: 987
    },

    // Beginner Technical Courses
    {
      id: 10,
      title: "Web Accessibility Fundamentals (WCAG 2.1)",
      description: "Learn WCAG guidelines and accessible web development practices from scratch.",
      category: "technical",
      audience: "all",
      price: "$45.99",
      duration: "4 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Alex Kumar",
      rating: 4.8,
      students: 1789
    },
    {
      id: 11,
      title: "Digital Literacy Masterclass for Seniors",
      description: "Comprehensive computer and internet skills tailored for senior learners.",
      category: "beginner",
      audience: "all",
      price: "Free",
      duration: "3 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Barbara Smith",
      rating: 4.9,
      students: 3120
    },
    {
      id: 12,
      title: "Introduction to Coding for Blind Developers",
      description: "Programming fundamentals using accessible development tools and screen readers.",
      category: "technical",
      audience: "visually-impaired",
      price: "$89.99",
      duration: "10 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Kevin O'Reilly",
      rating: 4.8,
      students: 654
    },

    // Specialized Courses
    {
      id: 13,
      title: "Braille Literacy Complete Mastery Program",
      description: "Comprehensive Braille reading and writing course for all levels with certification.",
      category: "literacy",
      audience: "visually-impaired",
      price: "$69.99",
      duration: "12 hours",
      level: "All Levels",
      image: "/api/placeholder/300/200",
      instructor: "Nancy Braille",
      rating: 4.9,
      students: 1234
    },
    {
      id: 14,
      title: "Assistive Technology Professional Certification",
      description: "Comprehensive guide to available assistive technologies and implementation strategies.",
      category: "technical",
      audience: "all",
      price: "$39.99",
      duration: "3 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Dr. Thomas Reed",
      rating: 4.7,
      students: 876
    },
    {
      id: 15,
      title: "Inclusive Classroom Strategies for Educators",
      description: "Advanced techniques for creating truly inclusive learning environments.",
      category: "education",
      audience: "all",
      price: "$99.99",
      duration: "15 hours",
      level: "Intermediate",
      image: "/api/placeholder/300/200",
      featured: true,
      instructor: "Dr. Susan Williams",
      rating: 4.9,
      students: 2109
    },
    {
      id: 16,
      title: "Career Development for People with Disabilities",
      description: "Complete job search strategies, resume building, and workplace accommodation guidance.",
      category: "career",
      audience: "all",
      price: "$49.99",
      duration: "5 hours",
      level: "Intermediate",
      image: "/api/placeholder/300/200",
      instructor: "Career Success Team",
      rating: 4.8,
      students: 1567
    },
    {
      id: 17,
      title: "American Sign Language (ASL) Complete Certification",
      description: "Comprehensive ASL training from beginner to advanced with official certification.",
      category: "language",
      audience: "hearing-impaired",
      price: "$129.99",
      duration: "20 hours",
      level: "All Levels",
      image: "/api/placeholder/300/200",
      instructor: "ASL Masters Institute",
      rating: 4.9,
      students: 2987
    },
    {
      id: 18,
      title: "Mindful Communication for Neurodiverse Individuals",
      description: "Advanced communication strategies tailored for neurodiverse learners and professionals.",
      category: "soft-skills",
      audience: "neurodiverse",
      price: "$44.99",
      duration: "4 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Dr. Rachel Green",
      rating: 4.7,
      students: 743
    },
    {
      id: 19,
      title: "Accessible Web Development Bootcamp 2024",
      description: "Build modern, accessible websites that everyone can use regardless of ability.",
      category: "technical",
      audience: "all",
      price: "$199.99",
      duration: "30 hours",
      level: "Advanced",
      image: "/api/placeholder/300/200",
      instructor: "Web Accessibility Pro",
      rating: 4.9,
      students: 1890
    },
    {
      id: 20,
      title: "Financial Literacy for Special Needs Planning",
      description: "Comprehensive financial management and future planning for individuals with special needs.",
      category: "life-skills",
      audience: "all",
      price: "$59.99",
      duration: "6 hours",
      level: "Intermediate",
      image: "/api/placeholder/300/200",
      instructor: "Financial Planning Experts",
      rating: 4.8,
      students: 1098
    },
    {
      id: 21,
      title: "Adaptive Sports and Recreation Masterclass",
      description: "Explore and master sports and recreational activities adapted for various abilities.",
      category: "health",
      audience: "mobility-challenged",
      price: "$29.99",
      duration: "3 hours",
      level: "Beginner",
      image: "/api/placeholder/300/200",
      instructor: "Adaptive Sports Coaches",
      rating: 4.7,
      students: 632
    },
    {
      id: 22,
      title: "Public Speaking for Everyone: Overcome Anxiety",
      description: "Proven techniques to overcome public speaking anxiety with inclusive presentation skills.",
      category: "soft-skills",
      audience: "all",
      price: "$39.99",
      duration: "4 hours",
      level: "Intermediate",
      image: "/api/placeholder/300/200",
      instructor: "Public Speaking Pro",
      rating: 4.8,
      students: 2456
    }
  ];

  // Filter courses based on selections
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const categoryMatch = filters.category === 'all' || course.category === filters.category;
      const audienceMatch = filters.audience === 'all' || course.audience === filters.audience;
      const priceMatch = filters.price === 'all' || 
                        (filters.price === 'free' && course.price === 'Free') ||
                        (filters.price === 'paid' && course.price !== 'Free');
      const searchMatch = filters.search === '' || 
                         course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         course.description.toLowerCase().includes(filters.search.toLowerCase());

      return categoryMatch && audienceMatch && priceMatch && searchMatch;
    });
  }, [filters, courses]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'beginner', label: 'Beginner Friendly' },
    { value: 'soft-skills', label: 'Soft Skills' },
    { value: 'technical', label: 'Technical Skills' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'career', label: 'Career Development' },
    { value: 'education', label: 'Education' }
  ];

  const audiences = [
    { value: 'all', label: 'All Audiences' },
    { value: 'visually-impaired', label: 'Visually Impaired' },
    { value: 'hearing-impaired', label: 'Hearing Impaired' },
    { value: 'mobility-challenged', label: 'Mobility Challenged' },
    { value: 'neurodiverse', label: 'Neurodiverse' }
  ];

  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free Only' },
    { value: 'paid', label: 'Paid Only' }
  ];

  return (
    <div className={styles.courseCatalogue}>
      {/* Header */}
      <section className={styles.catalogueHeader}>
        <div className={styles.container}>
          <h1>Explore Our Course Catalogue</h1>
          <p>Discover 20+ inclusive learning paths designed for every ability, learning style, and career goal</p>
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search courses by title or description..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label htmlFor="category-filter">Category</label>
              <select 
                id="category-filter"
                value={filters.category} 
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className={styles.filterSelect}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="audience-filter">Audience</label>
              <select 
                id="audience-filter"
                value={filters.audience} 
                onChange={(e) => handleFilterChange('audience', e.target.value)}
                className={styles.filterSelect}
              >
                {audiences.map(aud => (
                  <option key={aud.value} value={aud.value}>{aud.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="price-filter">Price</label>
              <select 
                id="price-filter"
                value={filters.price} 
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className={styles.filterSelect}
              >
                {priceOptions.map(price => (
                  <option key={price.value} value={price.value}>{price.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.resultsCount}>
              {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {filters.category === 'all' && filters.audience === 'all' && filters.search === '' && (
        <section className={styles.featuredCourses}>
          <div className={styles.container}>
            <h2>Featured Courses</h2>
            <div className={styles.coursesGrid}>
              {courses.filter(course => course.featured).map(course => (
                <CourseCard key={course.id} course={course} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Courses */}
      <section className={styles.allCourses}>
        <div className={styles.container}>
          <h2>
            {filters.category === 'all' && filters.audience === 'all' && filters.search === '' 
              ? 'All Courses' 
              : 'Filtered Courses'
            }
          </h2>
          {filteredCourses.length === 0 ? (
            <div className={styles.noResults}>
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className={styles.coursesGrid}>
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.catalogueCta}>
        <div className={styles.container}>
          <h2>Need a Custom Learning Solution?</h2>
          <p>We specialize in creating tailored courses for organizations and specific learning needs.</p>
          <button className={styles.ctaButton}>Request Custom Course</button>
        </div>
      </section>
    </div>
  );
};

export default CourseCatalogue;