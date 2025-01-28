import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect, useRef } from 'react'
import ThemeToggle from '../ThemeToggle'
import { useGsapAnimations } from '../../hooks/useGsapAnimations'
import { ScrollToTopOnMount, ScrollToTopButton } from '../ScrollToTop'
import Footer from './Footer'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'
import logo from '../../../public/images/logo.jpeg'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function Layout() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const { fadeInUp, staggerFadeInUp, slideInLeft } = useGsapAnimations()

  // Refs for animations
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const navLinksRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const footerRef = useRef(null)
  const footerLinksRefs = useRef([])

  // Initial animations
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
  }, [])

  // Footer animations - in a separate useEffect
  useEffect(() => {
    if (!footerRef.current) return;

    const footerSections = footerRef.current.querySelectorAll('.footer-section')
    
    // Create the animation
    const footerAnimation = gsap.fromTo(
      footerSections,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    )

    // Cleanup function
    return () => {
      footerAnimation.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [location.pathname]) // Re-run when route changes

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
    return location.pathname === path
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsProfileDropdownOpen(false)
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-primary">
      <ScrollToTopOnMount />
      <ScrollToTopButton />
      
      {/* Navigation */}
      <nav className="bg-green-500 text-white shadow-lg relative z-50" ref={navRef}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center" ref={logoRef}>
              <Link to="/" className="text-xl font-bold">
               <img 
                src={logo} 
                alt="SQL Hub Logo" 
                className="w-12 h-12 rounded-full object-cover mix-blend-multiply dark:mix-blend-screen bg-transparent border-2 border-white hover:border-green-200 transition-colors shadow-lg" 
               />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-600 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4 relative" ref={navLinksRef}>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors ${isActiveLink('/') ? 'bg-green-600' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/lessons"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors ${isActiveLink('/lessons') ? 'bg-green-600' : ''}`}
              >
                Lessons
              </Link>
              <Link
                to="/sql-editor"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors ${isActiveLink('/sql-editor') ? 'bg-green-600' : ''}`}
              >
                SQL Editor
              </Link>
              <Link
                to="/practice"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors ${isActiveLink('/practice') ? 'bg-green-600' : ''}`}
              >
                Practice
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors ${isActiveLink('/about') ? 'bg-green-600' : ''}`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors ${isActiveLink('/contact') ? 'bg-green-600' : ''}`}
              >
                Contact
              </Link>
              <Link
                to="/testimonials"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors ${isActiveLink('/testimonials') ? 'bg-green-600' : ''}`}
              >
                Testimonials
              </Link>
              <Link
                to="/pricing"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors ${isActiveLink('/pricing') ? 'bg-green-600' : ''}`}
              >
                Pricing
              </Link>
              {/* Right side items */}
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                {user ? (
                  <div className="relative profile-dropdown">
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center space-x-2 focus:outline-none relative z-10"
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="h-8 w-8 rounded-full object-cover border-2 border-white"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center border-2 border-white">
                          <FaUser className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5" style={{ zIndex: 9999 }}>
                        <div className="py-1" role="menu">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            role="menuitem"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="text-sm font-medium hover:text-green-200 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-white text-green-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-50 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors ${isActiveLink('/') ? 'bg-green-600' : ''}`}
                >
                  Home
                </Link>
                <Link
                  to="/lessons"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors ${isActiveLink('/lessons') ? 'bg-green-600' : ''}`}
                >
                  Lessons
                </Link>
                <Link
                  to="/sql-editor"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors ${isActiveLink('/sql-editor') ? 'bg-green-600' : ''}`}
                >
                  SQL Editor
                </Link>
                <Link
                  to="/practice"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors ${isActiveLink('/practice') ? 'bg-green-600' : ''}`}
                >
                  Practice
                </Link>
                <Link
                  to="/about"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors ${isActiveLink('/about') ? 'bg-green-600' : ''}`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors ${isActiveLink('/contact') ? 'bg-green-600' : ''}`}
                >
                  Contact
                </Link>
                <Link
                  to="/testimonials"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors ${isActiveLink('/testimonials') ? 'bg-green-600' : ''}`}
                >
                  Testimonials
                </Link>
                <Link
                  to="/pricing"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors ${isActiveLink('/pricing') ? 'bg-green-600' : ''}`}
                >
                  Pricing
                </Link>
                {user ? (
                  <>
                    <div className="flex items-center px-3 py-2">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="h-8 w-8 rounded-full object-cover border-2 border-white mr-2"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center border-2 border-white mr-2">
                          <FaUser className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <span className="text-sm font-medium">{user.displayName || user.email}</span>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 page-transition">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Layout 