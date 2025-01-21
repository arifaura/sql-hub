import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaEnvelope } from 'react-icons/fa';
import pnfImage from '../assets/img/pnf.svg';

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-brand/5 to-brand/10 dark:from-dark-primary dark:to-dark-secondary px-4">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <img
            src={pnfImage}
            alt="Page Not Found"
            className="w-96 h-auto mx-auto"
          />
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have vanished into the database void. Let's help you find your way back.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand hover:bg-brand-dark text-white rounded-lg transition-colors"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          <Link
            to="/lessons"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 dark:bg-dark-accent hover:bg-gray-700 dark:hover:bg-dark-primary text-white rounded-lg transition-colors"
          >
            <FaSearch className="mr-2" />
            Browse Lessons
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand text-brand dark:text-white hover:bg-brand hover:text-white rounded-lg transition-colors"
          >
            <FaEnvelope className="mr-2" />
            Contact Support
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-gray-600 dark:text-gray-400">
          <p>Need immediate assistance?</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-brand hover:text-brand-dark transition-colors">FAQ</a>
            <span>•</span>
            <a href="#" className="text-brand hover:text-brand-dark transition-colors">Help Center</a>
            <span>•</span>
            <a href="#" className="text-brand hover:text-brand-dark transition-colors">Site Map</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 