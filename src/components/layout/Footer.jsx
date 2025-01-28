import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              SQLHub
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Your one-stop platform for mastering SQL. Learn, practice, and excel in database management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/lessons" className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Lessons
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Practice
                </Link>
              </li>
              <li>
                <Link to="/sql-editor" className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  SQL Editor
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-500">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Connect With Us
            </h3>
            <div className="mt-4 flex space-x-6">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-green-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-green-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-green-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-green-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Subscribe to our newsletter
              </h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} SQLHub. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Made with <FaHeart className="inline-block text-red-500 mx-1" /> by SQLHub Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 