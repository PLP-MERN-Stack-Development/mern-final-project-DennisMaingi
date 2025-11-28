import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Content from './models/Content.js';

dotenv.config();

const getCourseSpecificLessons = (courseTitle) => {
  const lessons = {
    'Introduction to Programming': [
      'Variables and Data Types',
      'Control Flow and Loops',
      'Functions and Methods',
      'Object-Oriented Programming Basics',
      'Debugging and Error Handling'
    ],
    'HTML & CSS Basics': [
      'HTML Structure and Tags',
      'CSS Selectors and Properties',
      'Flexbox and Grid Layout',
      'Responsive Design',
      'Building Your First Website'
    ],
    'Git & Version Control': [
      'Git Basics and Setup',
      'Commits and Branches',
      'Merging and Resolving Conflicts',
      'GitHub and Remote Repositories',
      'Collaboration Workflows'
    ],
    'Web Development Fundamentals': [
      'HTML5 Semantic Elements',
      'CSS3 Animations and Transitions',
      'JavaScript DOM Manipulation',
      'Forms and Validation',
      'Web Accessibility'
    ],
    'React & Modern JavaScript': [
      'ES6+ Features',
      'React Components and Props',
      'State and Lifecycle',
      'Hooks and Context API',
      'Building a React App'
    ],
    'Python Programming': [
      'Python Syntax and Variables',
      'Lists, Tuples, and Dictionaries',
      'Functions and Modules',
      'File Handling',
      'Python Libraries'
    ],
    'Data Science with Python': [
      'NumPy and Pandas',
      'Data Visualization with Matplotlib',
      'Statistical Analysis',
      'Machine Learning Basics',
      'Real-World Data Projects'
    ],
    'Mobile App Development': [
      'React Native Setup',
      'Components and Navigation',
      'State Management',
      'API Integration',
      'Publishing Your App'
    ],
    'Cloud Computing with AWS': [
      'AWS Services Overview',
      'EC2 and S3',
      'Lambda Functions',
      'Database Services',
      'Deployment Strategies'
    ],
    'Full Stack JavaScript': [
      'Node.js and Express',
      'MongoDB and Mongoose',
      'RESTful APIs',
      'Authentication and Security',
      'Full Stack Project'
    ],
    'Cybersecurity Fundamentals': [
      'Security Principles',
      'Network Security',
      'Encryption and Cryptography',
      'Ethical Hacking',
      'Security Best Practices'
    ],
    'Machine Learning & AI': [
      'ML Algorithms',
      'Neural Networks',
      'Deep Learning',
      'Natural Language Processing',
      'AI Project Development'
    ],
    'DevOps & CI/CD': [
      'Docker Containers',
      'Kubernetes Orchestration',
      'CI/CD Pipelines',
      'Infrastructure as Code',
      'Monitoring and Logging'
    ],
    'Blockchain Development': [
      'Blockchain Basics',
      'Smart Contracts',
      'Solidity Programming',
      'Web3 Integration',
      'DApp Development'
    ],
    'UI/UX Design': [
      'Design Principles',
      'User Research',
      'Wireframing and Prototyping',
      'Figma Mastery',
      'Design Systems'
    ],
    'Database Design & SQL': [
      'Database Fundamentals',
      'SQL Queries',
      'Database Normalization',
      'Indexes and Optimization',
      'Advanced SQL'
    ],
    'Game Development with Unity': [
      'Unity Interface',
      'C# for Unity',
      '2D Game Development',
      '3D Game Development',
      'Publishing Your Game'
    ],
    'IoT & Arduino Programming': [
      'Arduino Basics',
      'Sensors and Actuators',
      'Circuit Design',
      'IoT Protocols',
      'Smart Home Project'
    ],
    'Digital Marketing & SEO': [
      'SEO Fundamentals',
      'Google Analytics',
      'Social Media Marketing',
      'Content Strategy',
      'Marketing Campaign'
    ]
  };
  return lessons[courseTitle] || ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5'];
};

const createCourseContent = (courseTitle) => {
  const specificLessons = getCourseSpecificLessons(courseTitle);
  return [
    {
      title: `Introduction to ${courseTitle}`,
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: 120,
      order: 1
    },
    {
      title: `Lesson 1: ${specificLessons[0]}`,
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: 180,
      order: 2
    },
    {
      title: `${specificLessons[0]} - Study Notes`,
      type: 'pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      duration: 0,
      order: 3
    },
    {
      title: `Lesson 2: ${specificLessons[1]}`,
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: 240,
      order: 4
    },
    {
      title: `${specificLessons[1]} - Study Notes`,
      type: 'pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      duration: 0,
      order: 5
    },
    {
      title: `Lesson 3: ${specificLessons[2]}`,
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: 200,
      order: 6
    },
    {
      title: `${specificLessons[2]} - Study Notes`,
      type: 'pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      duration: 0,
      order: 7
    },
    {
      title: `Lesson 4: ${specificLessons[3]}`,
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: 220,
      order: 8
    },
    {
      title: `${specificLessons[3]} - Study Notes`,
      type: 'pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      duration: 0,
      order: 9
    },
    {
      title: `Lesson 5: ${specificLessons[4]}`,
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: 300,
      order: 10
    },
    {
      title: `${specificLessons[4]} - Study Notes`,
      type: 'pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      duration: 0,
      order: 11
    },
    {
      title: `${courseTitle} - Final Project`,
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: 300,
      order: 12
    },
    {
      title: `Course Summary & Certificate`,
      type: 'pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      duration: 0,
      order: 13
    }
  ];
};

const createCourseResources = (courseTitle) => [
  {
    title: `${courseTitle} - Complete Course Notes`,
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '5.2 MB'
  },
  {
    title: `${courseTitle} - Chapter 1 Study Guide`,
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '1.8 MB'
  },
  {
    title: `${courseTitle} - Chapter 2 Study Guide`,
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '2.1 MB'
  },
  {
    title: `${courseTitle} - Chapter 3 Study Guide`,
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '1.9 MB'
  },
  {
    title: `${courseTitle} - Code Examples & Projects`,
    type: 'ZIP',
    url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip',
    size: '3.4 MB'
  },
  {
    title: `${courseTitle} - Quick Reference Cheat Sheet`,
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '800 KB'
  },
  {
    title: `${courseTitle} - Practice Exercises Workbook`,
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '2.5 MB'
  },
  {
    title: `${courseTitle} - Final Project Template`,
    type: 'ZIP',
    url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip',
    size: '1.2 MB'
  }
];

const sampleContent = [
  {
    title: 'Introduction to the Course',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 120,
    order: 1
  },
  {
    title: 'Getting Started - Lesson 1',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 180,
    order: 2
  },
  {
    title: 'Course Notes - Chapter 1',
    type: 'pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    duration: 0,
    order: 3
  },
  {
    title: 'Core Concepts - Lesson 2',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 240,
    order: 4
  },
  {
    title: 'Course Notes - Chapter 2',
    type: 'pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    duration: 0,
    order: 5
  },
  {
    title: 'Advanced Topics - Lesson 3',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 200,
    order: 6
  },
  {
    title: 'Course Notes - Chapter 3',
    type: 'pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    duration: 0,
    order: 7
  },
  {
    title: 'Practice Exercises',
    type: 'text',
    url: '',
    duration: 30,
    order: 8
  },
  {
    title: 'Final Project',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 300,
    order: 9
  },
  {
    title: 'Course Summary & Next Steps',
    type: 'pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    duration: 0,
    order: 10
  }
];

const sampleResources = [
  {
    title: 'Complete Course Notes (All Chapters)',
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '5.2 MB'
  },
  {
    title: 'Chapter 1 - Study Guide',
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '1.8 MB'
  },
  {
    title: 'Chapter 2 - Study Guide',
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '2.1 MB'
  },
  {
    title: 'Chapter 3 - Study Guide',
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '1.9 MB'
  },
  {
    title: 'Code Examples & Projects',
    type: 'ZIP',
    url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip',
    size: '3.4 MB'
  },
  {
    title: 'Quick Reference Cheat Sheet',
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '800 KB'
  },
  {
    title: 'Practice Exercises Workbook',
    type: 'PDF',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    size: '2.5 MB'
  },
  {
    title: 'Final Project Template',
    type: 'ZIP',
    url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip',
    size: '1.2 MB'
  }
];

const courses = [
  {
    title: 'Introduction to Programming',
    description: 'Start your coding journey - completely free',
    category: 'Technology',
    level: 'Beginner',
    price: 0,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop',
    instructor: 'Code Academy',
    duration: '4 weeks',
    enrolled: 3200,
    content: createCourseContent('Introduction to Programming'),
    resources: createCourseResources('Introduction to Programming')
  },
  {
    title: 'HTML & CSS Basics',
    description: 'Build your first website - free course',
    category: 'Technology',
    level: 'Beginner',
    price: 0,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=600&fit=crop',
    instructor: 'Web Academy',
    duration: '3 weeks',
    enrolled: 2800,
    content: createCourseContent('HTML & CSS Basics'),
    resources: createCourseResources('HTML & CSS Basics')
  },
  {
    title: 'Git & Version Control',
    description: 'Master Git and GitHub - free course',
    category: 'Technology',
    level: 'Beginner',
    price: 0,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop',
    instructor: 'Dev Academy',
    duration: '2 weeks',
    enrolled: 2400,
    content: createCourseContent('Git & Version Control'),
    resources: createCourseResources('Git & Version Control')
  },
  {
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript from scratch',
    category: 'Technology',
    level: 'Beginner',
    price: 49.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    instructor: 'Tech Academy',
    duration: '8 weeks',
    enrolled: 1250,
    content: createCourseContent('Web Development Fundamentals'),
    resources: createCourseResources('Web Development Fundamentals')
  },
  {
    title: 'React & Modern JavaScript',
    description: 'Master React.js and build modern web applications',
    category: 'Technology',
    level: 'Intermediate',
    price: 79.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    instructor: 'React Masters',
    duration: '10 weeks',
    enrolled: 980,
    content: createCourseContent('React & Modern JavaScript'),
    resources: createCourseResources('React & Modern JavaScript')
  },
  {
    title: 'Python Programming',
    description: 'Complete Python course from basics to advanced',
    category: 'Technology',
    level: 'Beginner',
    price: 59.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop',
    instructor: 'Code Academy',
    duration: '12 weeks',
    enrolled: 2100,
    content: createCourseContent('Python Programming'),
    resources: createCourseResources('Python Programming')
  },
  {
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning',
    category: 'Technology',
    level: 'Advanced',
    price: 99.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    instructor: 'Data Experts',
    duration: '16 weeks',
    enrolled: 750,
    content: createCourseContent('Data Science with Python'),
    resources: createCourseResources('Data Science with Python')
  },
  {
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native',
    category: 'Technology',
    level: 'Intermediate',
    price: 89.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    instructor: 'Mobile Dev Pro',
    duration: '14 weeks',
    enrolled: 620,
    content: createCourseContent('Mobile App Development'),
    resources: createCourseResources('Mobile App Development')
  },
  {
    title: 'Cloud Computing with AWS',
    description: 'Master Amazon Web Services and cloud architecture',
    category: 'Technology',
    level: 'Advanced',
    price: 109.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    instructor: 'Cloud Masters',
    duration: '12 weeks',
    enrolled: 540,
    content: createCourseContent('Cloud Computing with AWS'),
    resources: createCourseResources('Cloud Computing with AWS')
  },
  {
    title: 'Full Stack JavaScript',
    description: 'Build complete web apps with Node.js, Express, MongoDB, and React',
    category: 'Technology',
    level: 'Intermediate',
    price: 94.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
    instructor: 'Full Stack Academy',
    duration: '16 weeks',
    enrolled: 890,
    content: createCourseContent('Full Stack JavaScript'),
    resources: createCourseResources('Full Stack JavaScript')
  },
  {
    title: 'Cybersecurity Fundamentals',
    description: 'Learn ethical hacking, network security, and penetration testing',
    category: 'Technology',
    level: 'Intermediate',
    price: 119.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    instructor: 'Security Experts',
    duration: '10 weeks',
    enrolled: 670,
    content: createCourseContent('Cybersecurity Fundamentals'),
    resources: createCourseResources('Cybersecurity Fundamentals')
  },
  {
    title: 'Machine Learning & AI',
    description: 'Deep learning, neural networks, and artificial intelligence',
    category: 'Technology',
    level: 'Advanced',
    price: 129.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop',
    instructor: 'AI Institute',
    duration: '20 weeks',
    enrolled: 450,
    content: createCourseContent('Machine Learning & AI'),
    resources: createCourseResources('Machine Learning & AI')
  },
  {
    title: 'DevOps & CI/CD',
    description: 'Docker, Kubernetes, Jenkins, and automated deployment',
    category: 'Technology',
    level: 'Advanced',
    price: 99.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop',
    instructor: 'DevOps Pro',
    duration: '14 weeks',
    enrolled: 520,
    content: createCourseContent('DevOps & CI/CD'),
    resources: createCourseResources('DevOps & CI/CD')
  },
  {
    title: 'Blockchain Development',
    description: 'Smart contracts, Ethereum, Solidity, and Web3',
    category: 'Technology',
    level: 'Advanced',
    price: 139.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    instructor: 'Blockchain Academy',
    duration: '12 weeks',
    enrolled: 380,
    content: createCourseContent('Blockchain Development'),
    resources: createCourseResources('Blockchain Development')
  },
  {
    title: 'UI/UX Design',
    description: 'Figma, user research, prototyping, and design systems',
    category: 'Technology',
    level: 'Beginner',
    price: 69.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    instructor: 'Design Studio',
    duration: '8 weeks',
    enrolled: 1100,
    content: createCourseContent('UI/UX Design'),
    resources: createCourseResources('UI/UX Design')
  },
  {
    title: 'Database Design & SQL',
    description: 'PostgreSQL, MySQL, database optimization, and queries',
    category: 'Technology',
    level: 'Intermediate',
    price: 74.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop',
    instructor: 'Database Masters',
    duration: '10 weeks',
    enrolled: 780,
    content: createCourseContent('Database Design & SQL'),
    resources: createCourseResources('Database Design & SQL')
  },
  {
    title: 'Game Development with Unity',
    description: 'Create 2D and 3D games with Unity and C#',
    category: 'Technology',
    level: 'Intermediate',
    price: 89.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
    instructor: 'Game Dev Studio',
    duration: '16 weeks',
    enrolled: 640,
    content: createCourseContent('Game Development with Unity'),
    resources: createCourseResources('Game Development with Unity')
  },
  {
    title: 'IoT & Arduino Programming',
    description: 'Build smart devices with Arduino, Raspberry Pi, and sensors',
    category: 'Technology',
    level: 'Beginner',
    price: 64.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    instructor: 'IoT Academy',
    duration: '8 weeks',
    enrolled: 490,
    content: createCourseContent('IoT & Arduino Programming'),
    resources: createCourseResources('IoT & Arduino Programming')
  },
  {
    title: 'JavaScript Fundamentals',
    description: 'Learn JavaScript from scratch with hands-on projects and real-world examples',
    category: 'Programming',
    level: 'Beginner',
    price: 54.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop',
    instructor: 'JS Academy',
    duration: '10 weeks',
    enrolled: 1890,
    content: createCourseContent('JavaScript Fundamentals'),
    resources: createCourseResources('JavaScript Fundamentals')
  },
  {
    title: 'Java Programming Masterclass',
    description: 'Complete Java course covering OOP, data structures, and enterprise development',
    category: 'Programming',
    level: 'Intermediate',
    price: 84.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    instructor: 'Java Experts',
    duration: '16 weeks',
    enrolled: 1456,
    content: createCourseContent('Java Programming Masterclass'),
    resources: createCourseResources('Java Programming Masterclass')
  },
  {
    title: 'C++ for Beginners',
    description: 'Master C++ programming with practical examples and coding exercises',
    category: 'Programming',
    level: 'Beginner',
    price: 64.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    instructor: 'Code Academy',
    duration: '12 weeks',
    enrolled: 987,
    content: createCourseContent('C++ for Beginners'),
    resources: createCourseResources('C++ for Beginners')
  },
  {
    title: 'Network Security Essentials',
    description: 'Learn to secure networks, prevent attacks, and implement security protocols',
    category: 'Security',
    level: 'Intermediate',
    price: 94.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    instructor: 'Security Pro',
    duration: '10 weeks',
    enrolled: 743,
    content: createCourseContent('Network Security Essentials'),
    resources: createCourseResources('Network Security Essentials')
  },
  {
    title: 'Ethical Hacking & Penetration Testing',
    description: 'Learn ethical hacking techniques, vulnerability assessment, and penetration testing',
    category: 'Security',
    level: 'Advanced',
    price: 129.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    instructor: 'Cyber Defense Team',
    duration: '14 weeks',
    enrolled: 892,
    content: createCourseContent('Ethical Hacking & Penetration Testing'),
    resources: createCourseResources('Ethical Hacking & Penetration Testing')
  },
  {
    title: 'Accessible Web Design',
    description: 'Create inclusive websites for users with disabilities using WCAG standards',
    category: 'Special Needs',
    level: 'Beginner',
    price: 0,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
    instructor: 'Accessibility Experts',
    duration: '6 weeks',
    enrolled: 1234,
    content: createCourseContent('Accessible Web Design'),
    resources: createCourseResources('Accessible Web Design')
  },
  {
    title: 'Sign Language Basics',
    description: 'Learn American Sign Language fundamentals for effective communication',
    category: 'Special Needs',
    level: 'Beginner',
    price: 0,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop',
    instructor: 'ASL Institute',
    duration: '8 weeks',
    enrolled: 2156,
    content: createCourseContent('Sign Language Basics'),
    resources: createCourseResources('Sign Language Basics')
  },
  {
    title: 'Assistive Technology Training',
    description: 'Master screen readers, voice recognition, and adaptive devices for learning',
    category: 'Special Needs',
    level: 'Beginner',
    price: 0,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    instructor: 'Assistive Tech Team',
    duration: '5 weeks',
    enrolled: 876,
    content: createCourseContent('Assistive Technology Training'),
    resources: createCourseResources('Assistive Technology Training')
  },
  {
    title: 'Digital Marketing & SEO',
    description: 'Google Ads, SEO, social media marketing, and analytics',
    category: 'Technology',
    level: 'Beginner',
    price: 54.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    instructor: 'Marketing Pro',
    duration: '6 weeks',
    enrolled: 1350,
    content: createCourseContent('Digital Marketing & SEO'),
    resources: createCourseResources('Digital Marketing & SEO')
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Course.deleteMany({});
    await Content.deleteMany({});
    console.log('Cleared existing data');

    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ Created ${createdCourses.length} courses (${courses.filter(c => c.price === 0).length} free, ${courses.filter(c => c.price > 0).length} paid)`);

    mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();
