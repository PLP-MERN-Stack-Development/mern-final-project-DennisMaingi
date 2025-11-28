// src/types/index.ts
export interface Course {
  id: number;
  title: string;
  description: string;
  category: 'beginner' | 'soft-skills' | 'technical' | 'health' | 'career' | 'literacy' | 'education' | 'language' | 'life-skills';
  audience: 'all' | 'visually-impaired' | 'hearing-impaired' | 'mobility-challenged' | 'neurodiverse';
  price: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  image: string;
  featured?: boolean;
  instructor: string;
  rating: number;
  students: number;
}

export interface FilterState {
  category: string;
  audience: string;
  price: string;
  search: string;
}