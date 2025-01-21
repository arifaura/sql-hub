import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect, useRef } from 'react'
import ThemeToggle from '../ThemeToggle'
import { useGsapAnimations } from '../../hooks/useGsapAnimations'
import gsap from 'gsap'

function Layout() {
  const location = useLocation()
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { fadeInUp, staggerFadeInUp, slideInLeft } = useGsapAnimations()

  // Refs for animations
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const navLinksRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const footerRef = useRef(null)
  const footerLinksRefs = useRef([])

  useEffect(() => {
    // Initial navigation animations
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    )

    gsap.fromTo(
      navLinksRef.current.children,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      }
    )

    // Footer animations
    const footerSections = footerRef.current.querySelectorAll('.footer-section')
    gsap.fromTo(
      footerSections,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: 'auto', duration: 0.3, ease: 'power2.out' }
        )
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
    }
  }, [isMobileMenuOpen])

  // Page transition animation
  useEffect(() => {
    gsap.fromTo(
      '.page-transition',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )
  }, [location.pathname])

  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-blue-700' : ''
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-primary">
      {/* Navigation */}
      <nav className="bg-blue-600 dark:bg-dark-secondary text-white shadow-lg" ref={navRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center" ref={logoRef}>
              <Link to="/" className="text-xl font-bold">
                SQLHub
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none ml-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4" ref={navLinksRef}>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/')}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/about')}`}
              >
                About
              </Link>
              <Link
                to="/lessons"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/lessons')}`}
              >
                Lessons
              </Link>
              <Link
                to="/practice"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/practice')}`}
              >
                Practice
              </Link>
              <Link
                to="/quizzes"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/quizzes')}`}
              >
                Quizzes
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/contact')}`}
              >
                Contact
              </Link>
              {user ? (
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/profile')}`}
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-gray-100 transition-colors dark:bg-dark-accent dark:text-white dark:hover:bg-dark-primary"
                >
                  Login
                </Link>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            ref={mobileMenuRef}
            className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden pb-3`}
          >
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className={`px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/')}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={toggleMobileMenu}
                className={`px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/about')}`}
              >
                About
              </Link>
              <Link
                to="/lessons"
                onClick={toggleMobileMenu}
                className={`px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/lessons')}`}
              >
                Lessons
              </Link>
              <Link
                to="/practice"
                onClick={toggleMobileMenu}
                className={`px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/practice')}`}
              >
                Practice
              </Link>
              <Link
                to="/quizzes"
                onClick={toggleMobileMenu}
                className={`px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/quizzes')}`}
              >
                Quizzes
              </Link>
              <Link
                to="/contact"
                onClick={toggleMobileMenu}
                className={`px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/contact')}`}
              >
                Contact
              </Link>
              {user ? (
                <Link
                  to="/profile"
                  onClick={toggleMobileMenu}
                  className={`px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors ${isActiveLink('/profile')}`}
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="px-3 py-2 rounded-md text-base font-medium bg-white text-blue-600 hover:bg-gray-100 transition-colors dark:bg-dark-accent dark:text-white dark:hover:bg-dark-primary"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 page-transition">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-dark-secondary text-gray-300 dark:text-gray-400" ref={footerRef}>
        {/* Newsletter Section */}
        <div className="border-b border-gray-800 dark:border-gray-700 footer-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white dark:text-white mb-2">Stay Updated</h3>
                <p className="text-gray-400 dark:text-gray-300">Subscribe to our newsletter for the latest SQL tutorials and tips.</p>
              </div>
              <div className="w-full md:w-auto">
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 bg-gray-800 dark:bg-dark-primary text-white rounded-lg focus:ring-2 focus:ring-brand focus:outline-none w-full md:w-64"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 footer-section">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white dark:text-white">SQLHub</h4>
              <p className="text-sm">Your one-stop platform for mastering SQL through interactive learning and real-world practice.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/lessons" className="hover:text-white transition-colors">Lessons</a></li>
                <li><a href="/practice" className="hover:text-white transition-colors">Practice</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 footer-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">© 2024 SQLHub. All rights reserved.</p>
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 