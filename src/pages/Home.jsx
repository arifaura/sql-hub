import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-brand to-brand-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Master SQL with Interactive Lessons and Quizzes
                        </h1>
                        <p className="text-xl md:text-2xl mb-8">
                            Learn SQL from scratch, practice with real-world examples, and track your progress
                        </p>
                        <div className="flex justify-center gap-4">
                            {!user && (
                                <Link
                                    to="/register"
                                    className="bg-white text-brand px-6 py-3 rounded-lg font-semibold hover:bg-brand-light transition-colors"
                                >
                                    Get Started
                                </Link>
                            )}
                            <Link
                                to="/lessons"
                                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand transition-colors"
                            >
                                Explore Lessons
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Background decoration */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-brand-light dark:bg-dark-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg">
                            <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Interactive Lessons</h3>
                            <p className="text-gray-600 dark:text-dark-secondary">Learn SQL with hands-on examples and interactive code editors.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg">
                            <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Real-World Quizzes</h3>
                            <p className="text-gray-600 dark:text-dark-secondary">Test your knowledge with quizzes designed for real-world scenarios.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg">
                            <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Track Your Progress</h3>
                            <p className="text-gray-600 dark:text-dark-secondary">Monitor your learning journey with detailed progress reports.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-dark-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-brand-light dark:bg-dark-accent p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center">
                                    <span className="font-semibold">JD</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-white">John Doe</h4>
                                    <p className="text-gray-600 dark:text-dark-secondary">Data Analyst</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-dark-secondary">
                                "This app helped me land my dream job as a data analyst! The interactive lessons made learning SQL enjoyable."
                            </p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-brand-light dark:bg-dark-accent p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center">
                                    <span className="font-semibold">JS</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-white">Jane Smith</h4>
                                    <p className="text-gray-600 dark:text-dark-secondary">Software Developer</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-dark-secondary">
                                "The real-world examples and quizzes helped me understand complex SQL concepts quickly."
                            </p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-brand-light dark:bg-dark-accent p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center">
                                    <span className="font-semibold">RJ</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-white">Robert Johnson</h4>
                                    <p className="text-gray-600 dark:text-dark-secondary">Business Analyst</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-dark-secondary">
                                "The progress tracking feature kept me motivated throughout my learning journey."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home; 