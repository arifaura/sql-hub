import { Link } from 'react-router-dom';
import { FaDatabase, FaCode, FaChartLine, FaTrophy, FaBook, FaUsers, FaLaptopCode, FaCheck, FaVideo, FaFileAlt, FaLaptop, FaQuestion } from 'react-icons/fa';
import { useLessons } from '../context/LessonsContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

function LessonCard({ lesson, levelColor }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { isLessonCompleted, markLessonComplete } = useLessons();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className={`h-2 ${levelColor}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {lesson.title}
          </h3>
          {isLessonCompleted(lesson.id) && (
            <FaCheck className="text-green-500 w-5 h-5 flex-shrink-0" />
          )}
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-4 border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 ${activeTab === 'overview' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`pb-2 flex items-center space-x-1 ${activeTab === 'video' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
          >
            <FaVideo className="w-4 h-4" />
            <span>Video</span>
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`pb-2 flex items-center space-x-1 ${activeTab === 'docs' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
          >
            <FaFileAlt className="w-4 h-4" />
            <span>Docs</span>
          </button>
          <button
            onClick={() => setActiveTab('exercise')}
            className={`pb-2 flex items-center space-x-1 ${activeTab === 'exercise' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
          >
            <FaLaptop className="w-4 h-4" />
            <span>Exercise</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`pb-2 flex items-center space-x-1 ${activeTab === 'quiz' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
          >
            <FaQuestion className="w-4 h-4" />
            <span>Quiz</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mb-4">
          {activeTab === 'overview' && (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {lesson.description}
              </p>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Concepts:</h4>
                <div className="flex flex-wrap gap-2">
                  {lesson.concepts.map((concept, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'video' && (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={lesson.videoUrl}
                title={`${lesson.title} Tutorial`}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}

          {activeTab === 'docs' && lesson.documentation && (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {lesson.documentation.overview}
              </p>
              {lesson.documentation.sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'exercise' && lesson.exercises && (
            <div>
              {lesson.exercises.map((exercise, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {exercise.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exercise.description}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{exercise.initialCode}</code>
                    </pre>
                  </div>
                  <Link
                    to={`/sql-editor?exercise=${exercise.id}`}
                    className="mt-4 inline-flex items-center text-green-500 hover:text-green-600"
                  >
                    Try it yourself →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quiz' && lesson.quiz && (
            <div>
              {lesson.quiz.questions.map((question, index) => (
                <div key={index} className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {question.question}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
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
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isLessonCompleted(lesson.id) ? 'Completed' : 'Start Lesson'}
          </button>
        </div>
      </div>
    </div>
  );
}

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

  // Scroll to top when component mounts or level changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedLevel]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-green-500 dark:bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Master SQL: From Beginner to Advanced</h1>
            <p className="text-xl text-green-100 dark:text-gray-300 mb-8">
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
                <button className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Continue Learning
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
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
        <div className="grid grid-cols-1 gap-6">
          {levels[selectedLevel].lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              levelColor={levels[selectedLevel].color}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
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
            <FaBook className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Access comprehensive SQL documentation and references
            </p>
            <a href="#" className="text-green-500 hover:text-green-600 font-medium">Learn More →</a>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <FaChartLine className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Practice Exercises</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Strengthen your skills with hands-on exercises
            </p>
            <a href="#" className="text-green-500 hover:text-green-600 font-medium">Start Practice →</a>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <FaCode className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Code Examples</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Browse through real-world SQL code examples
            </p>
            <a href="#" className="text-green-500 hover:text-green-600 font-medium">View Examples →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lessons; 