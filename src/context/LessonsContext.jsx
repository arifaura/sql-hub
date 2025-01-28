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
        duration: '30 mins',
        videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
        documentation: {
          overview: 'Introduction to relational databases and SQL',
          sections: [
            {
              title: 'What is a Database?',
              content: 'A database is an organized collection of data...'
            },
            {
              title: 'SQL Basics',
              content: 'SQL (Structured Query Language) is used to manage and query relational databases...'
            }
          ]
        },
        exercises: [
          {
            id: 'ex1',
            title: 'Your First Query',
            description: 'Write a simple SELECT statement',
            initialCode: 'SELECT * FROM employees;',
            solution: 'SELECT * FROM employees;',
            hints: ['Use the SELECT keyword to retrieve data']
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What does SQL stand for?',
              options: [
                'Structured Query Language',
                'Simple Query Language',
                'Standard Query Logic',
                'System Query Language'
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 'select-basics',
        title: 'SELECT Statements',
        description: 'Master the art of retrieving data from databases',
        concepts: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
        duration: '45 mins',
        videoUrl: 'https://www.youtube.com/embed/7S_tz1z_5bA',
        documentation: {
          overview: 'Learn how to retrieve data using SELECT statements',
          sections: [
            {
              title: 'Basic SELECT Syntax',
              content: 'The SELECT statement is used to retrieve data from one or more tables...'
            },
            {
              title: 'Filtering with WHERE',
              content: 'Use the WHERE clause to filter rows based on conditions...'
            }
          ]
        },
        exercises: [
          {
            id: 'ex2',
            title: 'Filtering Data',
            description: 'Write a query to filter employees by department',
            initialCode: 'SELECT name FROM employees WHERE',
            solution: 'SELECT name FROM employees WHERE department = "Sales";',
            hints: ['Use the WHERE clause to specify conditions']
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q2',
              question: 'Which clause is used to filter rows in a SELECT statement?',
              options: ['WHERE', 'FILTER', 'HAVING', 'BY'],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 'basic-functions',
        title: 'Basic SQL Functions',
        description: 'Learn essential SQL functions for data analysis',
        concepts: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'],
        duration: '1 hour',
        videoUrl: 'https://www.youtube.com/embed/v=S86phsLFW1E&ab',
        documentation: {
          overview: 'Master essential SQL functions for data analysis and aggregation',
          sections: [
            {
              title: 'Aggregate Functions',
              content: 'SQL aggregate functions perform calculations on a set of values and return a single value. Common functions include COUNT, SUM, AVG, MIN, and MAX.'
            },
            {
              title: 'COUNT Function',
              content: 'The COUNT function returns the number of rows that match a specified condition. For example: COUNT(*) counts all rows, while COUNT(column_name) counts non-null values in that column.'
            },
            {
              title: 'SUM and AVG Functions',
              content: 'SUM calculates the total of numeric values in a column. AVG calculates the arithmetic mean. Both ignore NULL values.'
            },
            {
              title: 'MIN and MAX Functions',
              content: 'MIN returns the smallest value in a column, while MAX returns the largest value. These work with numbers, text, and dates.'
            }
          ]
        },
        exercises: [
          {
            id: 'ex-basic-func-1',
            title: 'Using COUNT and SUM',
            description: 'Calculate the total number of employees and their total salary',
            initialCode: 'SELECT COUNT(*) as total_employees,\n       SUM(salary) as total_salary\nFROM employees;',
            solution: 'SELECT COUNT(*) as total_employees,\n       SUM(salary) as total_salary\nFROM employees;',
            hints: ['Use COUNT(*) to count all rows', 'Use SUM(column) to total numeric values']
          },
          {
            id: 'ex-basic-func-2',
            title: 'Average and Maximum Salary',
            description: 'Find the average and highest salary in each department',
            initialCode: 'SELECT department,\n       ___(salary) as avg_salary,\n       ___(salary) as max_salary\nFROM employees\nGROUP BY department;',
            solution: 'SELECT department,\n       AVG(salary) as avg_salary,\n       MAX(salary) as max_salary\nFROM employees\nGROUP BY department;',
            hints: ['Use AVG for average values', 'Use MAX to find the highest value']
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q-basic-func-1',
              question: 'Which function would you use to find the total number of employees?',
              options: [
                'COUNT(*)',
                'SUM(*)',
                'TOTAL(*)',
                'NUM(*)'
              ],
              correctAnswer: 0
            },
            {
              id: 'q-basic-func-2',
              question: 'What is the difference between COUNT(*) and COUNT(column_name)?',
              options: [
                'COUNT(*) includes NULL values, COUNT(column_name) excludes them',
                'They are exactly the same',
                'COUNT(column_name) includes NULL values, COUNT(*) excludes them',
                'COUNT(*) only works with numeric columns'
              ],
              correctAnswer: 0
            },
            {
              id: 'q-basic-func-3',
              question: 'Which function calculates the arithmetic mean of a numeric column?',
              options: [
                'AVG',
                'MEAN',
                'AVERAGE',
                'MID'
              ],
              correctAnswer: 0
            }
          ]
        }
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
        duration: '1.5 hours',
        videoUrl: 'https://www.youtube.com/embed/2HVMiPPuPIM',
        documentation: {
          overview: 'Learn how to combine data from multiple tables using JOINs',
          sections: [
            {
              title: 'Understanding Table Relationships',
              content: 'Tables in a relational database are connected through relationships...'
            },
            {
              title: 'Types of JOINs',
              content: 'There are several types of JOINs: INNER, LEFT, RIGHT, and FULL...'
            }
          ]
        },
        exercises: [
          {
            id: 'ex3',
            title: 'Basic INNER JOIN',
            description: 'Write a query to join employees and departments tables',
            initialCode: 'SELECT e.name, d.department_name\nFROM employees e',
            solution: 'SELECT e.name, d.department_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.id;',
            hints: ['Use INNER JOIN to combine matching rows from both tables']
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q3',
              question: 'Which JOIN returns only matching rows from both tables?',
              options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
              correctAnswer: 0
            }
          ]
        }
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
        duration: '2 hours',
        videoUrl: 'https://www.youtube.com/embed/Wvg4PjbMTO8',
        documentation: {
          overview: 'Master window functions for advanced data analysis',
          sections: [
            {
              title: 'Introduction to Window Functions',
              content: 'Window functions perform calculations across a set of table rows...'
            },
            {
              title: 'Ranking Functions',
              content: 'Learn about ROW_NUMBER, RANK, and DENSE_RANK functions...'
            }
          ]
        },
        exercises: [
          {
            id: 'ex4',
            title: 'Using ROW_NUMBER',
            description: 'Write a query to rank employees by salary within each department',
            initialCode: 'SELECT name, salary, department_id,\nROW_NUMBER()',
            solution: 'SELECT name, salary, department_id,\nROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank\nFROM employees;',
            hints: ['Use OVER clause to define the window']
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q4',
              question: 'What is the difference between RANK and DENSE_RANK?',
              options: [
                'RANK leaves gaps in rankings, DENSE_RANK does not',
                'DENSE_RANK leaves gaps in rankings, RANK does not',
                'They are exactly the same',
                'None of the above'
              ],
              correctAnswer: 0
            }
          ]
        }
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