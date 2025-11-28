// src/components/CourseCatalogue/CourseCard.tsx
import React from 'react';
import { Course } from '../../types';
import styles from './CourseCatalogue.module.css';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, featured = false }) => {
  const getAudienceColor = (audience: string) => {
    const colors: { [key: string]: string } = {
      'visually-impaired': styles.visuallyImpaired,
      'hearing-impaired': styles.hearingImpaired,
      'mobility-challenged': styles.mobilityChallenged,
      'neurodiverse': styles.neurodiverse,
      'all': styles.allAudience
    };
    return colors[audience] || styles.allAudience;
  };

  const getAudienceLabel = (audience: string) => {
    const labels: { [key: string]: string } = {
      'visually-impaired': 'Visually Impaired',
      'hearing-impaired': 'Hearing Impaired',
      'mobility-challenged': 'Mobility Challenged',
      'neurodiverse': 'Neurodiverse',
      'all': 'All Audiences'
    };
    return labels[audience] || 'All Audiences';
  };

  return (
    <div className={`${styles.courseCard} ${featured ? styles.featured : ''}`}>
      <div className={styles.courseImage}>
        <img src={course.image} alt={course.title} />
        {featured && <span className={styles.featuredBadge}>Featured</span>}
        {course.price === 'Free' && <span className={styles.freeBadge}>Free</span>}
      </div>
      
      <div className={styles.courseContent}>
        <h3>{course.title}</h3>
        <p className={styles.courseDescription}>{course.description}</p>
        
        <div className={styles.courseMeta}>
          <div className={styles.instructor}>
            <span className={styles.instructorName}>By {course.instructor}</span>
          </div>
          <div className={styles.rating}>
            ⭐ {course.rating} ({course.students.toLocaleString()} students)
          </div>
        </div>

        <div className={styles.courseDetails}>
          <span className={styles.level}>{course.level}</span>
          <span className={styles.duration}>{course.duration}</span>
        </div>

        <div className={styles.courseAudience}>
          <span className={`${styles.audienceTag} ${getAudienceColor(course.audience)}`}>
            {getAudienceLabel(course.audience)}
          </span>
        </div>

        <div className={styles.courseFooter}>
          <div className={styles.coursePrice}>{course.price}</div>
          <button className={styles.enrollBtn}>
            {course.price === 'Free' ? 'Start Learning Free' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;