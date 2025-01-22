import { Link } from 'react-router-dom';
import { FaDatabase, FaCode, FaChartLine, FaTrophy, FaBook, FaUsers, FaLaptopCode, FaCheck } from 'react-icons/fa';
import { useLessons } from '../context/LessonsContext';
import { useAuth } from '../context/AuthContext';

function Lessons() {
  const { user } = useAuth();
  const {
    levels,
    selectedLevel,
    setSelectedLevel,
    completedLessons,
    userProgress,
    markLessonComplete,
    isLessonCompleted
  } = useLessons();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Master SQL: From Beginner to Advanced</h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 mb-8">
              Unlock the power of databases with step-by-step SQL lessons, real-world examples, and hands-on exercises.
            </p>
            {user ? (
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md bg-white/10 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round(userProgress.totalCompleted / Object.values(levels).reduce((sum, level) => sum + level.lessons.length, 0) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${(userProgress.totalCompleted / Object.values(levels).reduce((sum, level) => sum + level.lessons.length, 0)) * 100}%` }}
                    />
                  </div>
                </div>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Continue Learning
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Learning Now
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Learning Roadmap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your SQL Learning Journey</h2>
        
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10" />
          {Object.entries(levels).map(([key, value], index) => (
            <div key={key} className="flex-1">
              <button
                onClick={() => setSelectedLevel(key)}
                className={`w-full flex flex-col items-center ${selectedLevel === key ? 'opacity-100' : 'opacity-60'} transition-opacity duration-200`}
              >
                <div 
                  className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center text-white mb-3 shadow-lg transform hover:scale-110 transition-transform duration-200`}
                >
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {value.title}
                </span>
                {user && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {index === 0 && `${Math.round(userProgress.beginnerProgress)}% Complete`}
                    {index === 1 && `${Math.round(userProgress.intermediateProgress)}% Complete`}
                    {index === 2 && `${Math.round(userProgress.advancedProgress)}% Complete`}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels[selectedLevel].lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`h-2 ${levels[selectedLevel].color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {lesson.title}
                  </h3>
                  {isLessonCompleted(lesson.id) && (
                    <FaCheck className="text-green-500 w-5 h-5 flex-shrink-0" />
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {lesson.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {lesson.concepts.map((concept, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Duration: {lesson.duration}
                  </span>
                  <button
                    onClick={() => markLessonComplete(lesson.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isLessonCompleted(lesson.id)
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isLessonCompleted(lesson.id) ? 'Completed' : 'Start Lesson'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <FaLaptopCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">Practice SQL with our interactive code editor</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <FaDatabase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-world Examples</h3>
              <p className="text-gray-600 dark:text-gray-300">Learn with practical, industry-relevant examples</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <FaTrophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">Earn certificates as you complete lessons</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <FaUsers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Join our community of SQL learners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <FaBook className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Access comprehensive SQL documentation and references
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Learn More →</a>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <FaChartLine className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Practice Exercises</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Strengthen your skills with hands-on exercises
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Start Practice →</a>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <FaCode className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Code Examples</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Browse through real-world SQL code examples
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">View Examples →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lessons; 