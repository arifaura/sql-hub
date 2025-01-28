import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Skeleton loading components
function SkeletonHero() {
    return (
        <section className="relative h-[600px] overflow-hidden bg-gray-200 animate-pulse">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                <div className="text-center space-y-4">
                    <div className="h-12 bg-gray-300 rounded-lg w-3/4 mx-auto"></div>
                    <div className="h-8 bg-gray-300 rounded-lg w-1/2 mx-auto"></div>
                    <div className="h-12 bg-gray-300 rounded-lg w-48 mx-auto mt-8"></div>
                </div>
            </div>
        </section>
    );
}

function SkeletonCourseCard() {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-24 mt-4"></div>
            </div>
        </div>
    );
}

// Separate components for better performance
function HeroSection() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = '/images/herobg.jpg';
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageError(true);
    }, []);

    if (!imageLoaded && !imageError) {
        return <SkeletonHero />;
    }

    return (
        <section className="relative h-[600px] overflow-hidden">
            <img 
                src="/images/herobg.jpg" 
                alt="SQL Database Background" 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/80"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                <div className="text-center animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                        Master SQL today
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Unlock your data potential
                    </p>
                    <Link
                        to="/lessons"
                        className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors uppercase tracking-wide"
                    >
                        VIEW SERVICES
                    </Link>
                </div>
            </div>
        </section>
    );
}

function CourseCard({ image, title, description, delay }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageError(true);
    }, [image]);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 opacity-0 translate-y-4 animate-fade-in-up"
             style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
            <div className="relative h-48">
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                {imageError ? (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                        <span className="text-2xl">Image not available</span>
                    </div>
                ) : (
                    <img
                        src={image}
                        alt={title}
                        className={`w-full h-48 object-cover transition-opacity duration-300 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                </h3>
                <p className="text-gray-600">
                    {description}
                </p>
                <Link
                    to="/lessons"
                    className="mt-4 inline-flex items-center text-green-500 hover:text-green-600"
                >
                    Learn more →
                </Link>
            </div>
        </div>
    );
}

function Home() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [visibleSections, setVisibleSections] = useState([]);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);

        // Progressive loading of sections
        const loadSections = async () => {
            const sections = ['hero', 'master', 'courses', 'contact'];
            for (let i = 0; i < sections.length; i++) {
                setVisibleSections(prev => [...prev, sections[i]]);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            setIsLoading(false);
        };

        loadSections();
    }, []);

    const courseCards = [
        {
            image: '/images/pexels-cottonbro-4709289.jpg',
            title: 'SQL fundamentals',
            description: 'Master the basics of SQL with our comprehensive course.'
        },
        {
            image: '/images/pexels-pixabay-256502.jpg',
            title: 'Advanced SQL techniques',
            description: 'Take your SQL skills to the next level with our advanced course.'
        },
        {
            image: '/images/pexels-cottonbro-6636117.jpg',
            title: 'SQL for data analysis',
            description: 'Unlock the power of data with our SQL for Data Analysis course.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            {visibleSections.includes('hero') ? <HeroSection /> : <SkeletonHero />}

            {/* Master SQL Section */}
            {visibleSections.includes('master') && (
                <section className="py-20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="text-green-500 font-semibold mb-4 uppercase tracking-wide">
                                    UNLOCK YOUR SQL POTENTIAL
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Master SQL with expert guidance
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    At sql-hub, we empower learners in Hyderabad, IN to master SQL through dynamic online courses and hands-on exercises. Our experienced instructors break down complex concepts into approachable lessons, ensuring you gain practical skills that you can apply immediately.
                                </p>
                                <Link
                                    to="/contact"
                                    className="text-green-500 font-semibold hover:text-green-600 transition-colors"
                                >
                                    Get in touch
                                </Link>
                            </div>
                            <div className="relative">
                                <img
                                    src="/images/pexels-cottonbro-4709287.jpg"
                                    alt="SQL Learning Platform"
                                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Course Cards Section */}
            {visibleSections.includes('courses') ? (
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                MASTER SQL SKILLS
                            </h2>
                            <p className="text-xl text-gray-600">
                                Unlock the power of data management
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {courseCards.map((card, index) => (
                                <CourseCard key={index} {...card} delay={600 + index * 200} />
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <SkeletonCourseCard key={index} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Form Section */}
            {visibleSections.includes('contact') && (
                <section className="py-20 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <div className="text-green-500 font-semibold mb-4 uppercase tracking-wide">
                                    GET IN TOUCH
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    We're here to help you learn SQL!
                                </h2>
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name *</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            placeholder="Jane Smith"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email address *</label>
                                        <input
                                            type="email"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            placeholder="email@website.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone number *</label>
                                        <input
                                            type="tel"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            placeholder="555-555-5555"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Message</label>
                                        <textarea
                                            rows={4}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                                        >
                                            SUBMIT
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Get in touch</h3>
                                <div className="space-y-4">
                                    <p>
                                        <a href="mailto:microsoftai.bs@gmail.com" className="text-green-500 hover:text-green-600">
                                            microsoftai.bs@gmail.com
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#" className="text-gray-600">
                                            Hyderabad, TS IN
                                        </a>
                                    </p>
                                    <div className="border-t border-gray-200 pt-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
                                        <div className="space-y-1 text-gray-600 font-mono">
                                            <p>Monday    : 9:00am – 10:00pm</p>
                                            <p>Tuesday   : 9:00am – 10:00pm</p>
                                            <p>Wednesday : 9:00am – 10:00pm</p>
                                            <p>Thursday  : 9:00am – 10:00pm</p>
                                            <p>Friday    : 9:00am – 10:00pm</p>
                                            <p>Saturday  : 9:00am – 6:00pm</p>
                                            <p>Sunday    : Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Home; 