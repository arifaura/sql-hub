import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const LessonsContext = createContext();

const LEVELS = {
  beginner: {
    title: 'Beginner',
    color: 'bg-green-500',
    lessons: [
      {
        id: 'intro-db',
        title: 'Introduction to Databases and SQL',
        description: 'Learn the fundamentals of databases and SQL basics',
        concepts: ['Database Types', 'SQL Overview', 'Basic Concepts'],
        duration: '30 mins'
      },
      {
        id: 'select-basics',
        title: 'SELECT Statements',
        description: 'Master the art of retrieving data from databases',
        concepts: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
        duration: '45 mins'
      },
      {
        id: 'basic-functions',
        title: 'Basic SQL Functions',
        description: 'Learn essential SQL functions for data analysis',
        concepts: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'],
        duration: '1 hour'
      }
    ]
  },
  intermediate: {
    title: 'Intermediate',
    color: 'bg-blue-500',
    lessons: [
      {
        id: 'sql-joins',
        title: 'SQL JOINs',
        description: 'Connect multiple tables using different types of joins',
        concepts: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
        duration: '1.5 hours'
      },
      {
        id: 'grouping',
        title: 'Grouping and Aggregation',
        description: 'Learn to group and aggregate data effectively',
        concepts: ['GROUP BY', 'HAVING', 'Aggregate Functions'],
        duration: '1 hour'
      },
      {
        id: 'subqueries',
        title: 'Subqueries',
        description: 'Master the art of nested queries',
        concepts: ['Subqueries', 'Correlated Subqueries', 'EXISTS'],
        duration: '1.5 hours'
      }
    ]
  },
  advanced: {
    title: 'Advanced',
    color: 'bg-purple-500',
    lessons: [
      {
        id: 'window-functions',
        title: 'Window Functions',
        description: 'Advanced data analysis with window functions',
        concepts: ['ROW_NUMBER', 'RANK', 'DENSE_RANK', 'LAG/LEAD'],
        duration: '2 hours'
      },
      {
        id: 'optimization',
        title: 'Performance Optimization',
        description: 'Learn to write efficient SQL queries',
        concepts: ['Indexing', 'Query Plans', 'Optimization Techniques'],
        duration: '2 hours'
      },
      {
        id: 'advanced-features',
        title: 'Advanced SQL Features',
        description: 'Master advanced SQL concepts and techniques',
        concepts: ['CTEs', 'Pivoting', 'Recursive Queries'],
        duration: '2.5 hours'
      }
    ]
  }
};

export function LessonsProvider({ children }) {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [userProgress, setUserProgress] = useState({
    totalCompleted: 0,
    beginnerProgress: 0,
    intermediateProgress: 0,
    advancedProgress: 0
  });

  // Load user progress from localStorage or backend
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`sqlhub_progress_${user.uid}`);
      if (savedProgress) {
        const { completed, progress } = JSON.parse(savedProgress);
        setCompletedLessons(new Set(completed));
        setUserProgress(progress);
      }
    }
  }, [user]);

  // Save progress when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`sqlhub_progress_${user.uid}`, JSON.stringify({
        completed: Array.from(completedLessons),
        progress: userProgress
      }));
    }
  }, [completedLessons, userProgress, user]);

  const markLessonComplete = (lessonId) => {
    if (!user) return;

    setCompletedLessons(prev => {
      const newCompleted = new Set(prev);
      newCompleted.add(lessonId);
      return newCompleted;
    });

    // Update progress percentages
    setUserProgress(prev => {
      const totalLessons = Object.values(LEVELS).reduce((sum, level) => sum + level.lessons.length, 0);
      const beginnerCompleted = LEVELS.beginner.lessons.filter(l => completedLessons.has(l.id)).length;
      const intermediateCompleted = LEVELS.intermediate.lessons.filter(l => completedLessons.has(l.id)).length;
      const advancedCompleted = LEVELS.advanced.lessons.filter(l => completedLessons.has(l.id)).length;

      return {
        totalCompleted: completedLessons.size + 1,
        beginnerProgress: (beginnerCompleted / LEVELS.beginner.lessons.length) * 100,
        intermediateProgress: (intermediateCompleted / LEVELS.intermediate.lessons.length) * 100,
        advancedProgress: (advancedCompleted / LEVELS.advanced.lessons.length) * 100
      };
    });
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.has(lessonId);
  };

  const value = {
    levels: LEVELS,
    selectedLevel,
    setSelectedLevel,
    completedLessons,
    userProgress,
    markLessonComplete,
    isLessonCompleted
  };

  return (
    <LessonsContext.Provider value={value}>
      {children}
    </LessonsContext.Provider>
  );
}

export function useLessons() {
  const context = useContext(LessonsContext);
  if (context === undefined) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
} 