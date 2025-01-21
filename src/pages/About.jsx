import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand to-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About SQL Hub</h1>
            <p className="text-xl md:text-2xl">
              Empowering developers to master SQL through interactive learning
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white dark:bg-dark-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Story</h2>
              <p className="text-gray-600 dark:text-dark-secondary mb-4">
                SQL Hub was born from a simple idea: make learning SQL accessible, engaging, and effective for everyone. Our journey began when we noticed the gap between theoretical SQL knowledge and practical application in real-world scenarios.
              </p>
              <p className="text-gray-600 dark:text-dark-secondary">
                Today, we're proud to offer a comprehensive learning platform that combines interactive lessons, real-world examples, and a supportive community to help developers at all levels master SQL.
              </p>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="/images/about-story.jpg"
                alt="Team collaboration"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 bg-brand-light dark:bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-dark-accent rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/team-1.jpg"
                alt="Sarah Johnson"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Sarah Johnson</h3>
                <p className="text-brand mb-2">Founder & CEO</p>
                <p className="text-gray-600 dark:text-dark-secondary mb-4">
                  10+ years of experience in database architecture and education.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white dark:bg-dark-accent rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/team-2.jpg"
                alt="Michael Chen"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Michael Chen</h3>
                <p className="text-brand mb-2">Lead Developer</p>
                <p className="text-gray-600 dark:text-dark-secondary mb-4">
                  Full-stack developer with expertise in database optimization.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white dark:bg-dark-accent rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/team-3.jpg"
                alt="Emily Rodriguez"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Emily Rodriguez</h3>
                <p className="text-brand mb-2">Content Director</p>
                <p className="text-gray-600 dark:text-dark-secondary mb-4">
                  Curriculum developer with a passion for interactive learning.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white dark:bg-dark-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-brand-light dark:bg-dark-accent p-6 rounded-lg">
              <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-dark-secondary">
                We constantly innovate our teaching methods to provide the best learning experience.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-brand-light dark:bg-dark-accent p-6 rounded-lg">
              <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Community</h3>
              <p className="text-gray-600 dark:text-dark-secondary">
                We foster a supportive community where learners can grow together.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-brand-light dark:bg-dark-accent p-6 rounded-lg">
              <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Quality</h3>
              <p className="text-gray-600 dark:text-dark-secondary">
                We maintain high standards in our content and platform to ensure the best learning outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About; 