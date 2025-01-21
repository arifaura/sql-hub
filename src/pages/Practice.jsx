import { useState, useEffect, useRef } from 'react';
import { FaCode, FaDatabase, FaLightbulb, FaTrophy } from 'react-icons/fa';
import { useGsapAnimations } from '../hooks/useGsapAnimations';

function Practice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { fadeInUp, staggerFadeInUp, scaleIn, scrollAnimation } = useGsapAnimations();

  // Refs for animations
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const filterRef = useRef(null);
  const challengesRef = useRef(null);
  const statCardsRefs = useRef([]);

  useEffect(() => {
    // Initial animations
    fadeInUp(headerRef.current);
    
    // Animate stat cards with stagger
    staggerFadeInUp(statCardsRefs.current);
    
    // Filter buttons animation
    scaleIn(filterRef.current, 0.5);
    
    // Scroll-triggered animations for challenges
    scrollAnimation(challengesRef.current);
  }, []);

  const challenges = [
    {
      id: 1,
      title: "Basic SELECT Queries",
      description: "Practice writing simple SELECT statements with WHERE clauses",
      difficulty: "beginner",
      estimatedTime: "15 mins",
      points: 10,
    },
    {
      id: 2,
      title: "JOIN Operations",
      description: "Master different types of JOINs with multiple tables",
      difficulty: "intermediate",
      estimatedTime: "25 mins",
      points: 20,
    },
    {
      id: 3,
      title: "Aggregate Functions",
      description: "Work with GROUP BY and aggregate functions",
      difficulty: "intermediate",
      estimatedTime: "20 mins",
      points: 15,
    },
    {
      id: 4,
      title: "Subqueries Advanced",
      description: "Complex subqueries and correlated subqueries",
      difficulty: "advanced",
      estimatedTime: "30 mins",
      points: 25,
    },
  ];

  const filteredChallenges = selectedDifficulty === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-primary py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center" ref={headerRef}>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            SQL Practice Challenges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enhance your SQL skills with our interactive challenges. Practice real-world scenarios and level up your database expertise.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" ref={statsRef}>
          {[
            {
              icon: <FaCode className="h-6 w-6 text-brand" />,
              title: "Total Challenges",
              value: "24"
            },
            {
              icon: <FaDatabase className="h-6 w-6 text-brand" />,
              title: "Databases Available",
              value: "8"
            },
            {
              icon: <FaLightbulb className="h-6 w-6 text-brand" />,
              title: "Skill Levels",
              value: "3"
            },
            {
              icon: <FaTrophy className="h-6 w-6 text-brand" />,
              title: "Points Available",
              value: "450"
            }
          ].map((stat, index) => (
            <div
              key={stat.title}
              ref={el => statCardsRefs.current[index] = el}
              className="bg-white dark:bg-dark-accent overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        <div className="mt-8 flex justify-center space-x-4" ref={filterRef}>
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 'all'
                ? 'bg-brand text-white'
                : 'bg-white dark:bg-dark-accent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-primary'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedDifficulty('beginner')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 'beginner'
                ? 'bg-brand text-white'
                : 'bg-white dark:bg-dark-accent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-primary'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedDifficulty('intermediate')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 'intermediate'
                ? 'bg-brand text-white'
                : 'bg-white dark:bg-dark-accent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-primary'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedDifficulty('advanced')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === 'advanced'
                ? 'bg-brand text-white'
                : 'bg-white dark:bg-dark-accent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-primary'
            }`}
          >
            Advanced
          </button>
        </div>

        {/* Challenges Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" ref={challengesRef}>
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white dark:bg-dark-accent rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {challenge.title}
                  </h3>
                  <span className={`text-sm font-medium capitalize ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {challenge.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {challenge.estimatedTime}
                  </span>
                  <span className="text-sm font-semibold text-brand">
                    {challenge.points} points
                  </span>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg transition-colors">
                  Start Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Practice; 