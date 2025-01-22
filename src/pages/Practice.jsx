import { useState } from 'react';
import { FaCode, FaDatabase, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Practice() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'basic',
      title: 'Basic SQL',
      description: 'Practice fundamental SQL queries and operations',
      icon: <FaCode className="w-6 h-6" />,
      exercises: [
        { id: 1, title: 'SELECT Statements', difficulty: 'Easy' },
        { id: 2, title: 'WHERE Clauses', difficulty: 'Easy' },
        { id: 3, title: 'ORDER BY and GROUP BY', difficulty: 'Medium' }
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermediate SQL',
      description: 'Learn and practice JOINs and subqueries',
      icon: <FaDatabase className="w-6 h-6" />,
      exercises: [
        { id: 4, title: 'INNER and LEFT JOINs', difficulty: 'Medium' },
        { id: 5, title: 'Subqueries', difficulty: 'Medium' },
        { id: 6, title: 'Aggregate Functions', difficulty: 'Medium' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced SQL',
      description: 'Master complex queries and optimizations',
      icon: <FaLightbulb className="w-6 h-6" />,
      exercises: [
        { id: 7, title: 'Window Functions', difficulty: 'Hard' },
        { id: 8, title: 'CTEs and Views', difficulty: 'Hard' },
        { id: 9, title: 'Query Optimization', difficulty: 'Hard' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard':
        return 'text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            SQL Practice Exercises
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose a category and start practicing SQL queries
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-brand/10 dark:bg-brand/20 rounded-lg text-brand">
                  {category.icon}
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              {selectedCategory === category.id && (
                <div className="space-y-3 mt-4 border-t pt-4 dark:border-gray-700">
                  {category.exercises.map((exercise) => (
                    <Link
                      key={exercise.id}
                      to={`/sql-editor?exercise=${exercise.id}`}
                      className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">
                          {exercise.title}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <button
                className="mt-4 text-brand hover:text-brand-dark dark:hover:text-brand-light transition-colors text-sm font-medium"
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
              >
                {selectedCategory === category.id ? 'Show Less' : 'View Exercises'}
              </button>
            </div>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Practice?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Jump straight into our SQL editor and start writing queries
          </p>
          <Link
            to="/sql-editor"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors"
          >
            Open SQL Editor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Practice; 