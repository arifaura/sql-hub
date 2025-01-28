import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: 'Brandon Vega',
    role: 'Tech Innovations',
    image: '/images/testimonials/pexels-tiger-lily-4484071.jpg',
    content: 'SQL-Hub transformed my understanding of database management. The hands-on approach and practical examples made complex concepts easy to grasp, allowing me to confidently apply SQL in my projects.'
  },
  {
    id: 2,
    name: 'Chris Wei',
    role: 'Data Solutions',
    image: '/images/testimonials/pexels-kampus-5920775.jpg',
    content: 'Before joining SQL-Hub, I struggled with SQL queries. The structured curriculum and expert guidance helped me master SQL in no time, which significantly boosted my career prospects.'
  },
  {
    id: 3,
    name: 'Karen Weiss',
    role: 'Insight Analytics',
    image: '/images/testimonials/pexels-keira-burton-6084049.jpg',
    content: 'The interactive lessons at SQL-Hub were a game-changer for me. I appreciated the focus on real-world applications, which made learning both engaging and relevant to my job.'
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    role: 'Database Administrator',
    image: '/images/testimonials/pexels-kooldark-14438790.jpg',
    content: 'The advanced SQL courses at SQL-Hub helped me transition from a junior to a senior database administrator. The practical exercises and real-world scenarios were invaluable.'
  },
  {
    id: 5,
    name: 'Sarah Chen',
    role: 'Business Intelligence Analyst',
    image: '/images/testimonials/pexels-ketut-subiyanto-4307884.jpg',
    content: "SQL-Hub's curriculum is perfectly structured for both beginners and advanced learners. The progression from basic to complex queries helped me build a strong foundation in data analysis."
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Software Engineer',
    image: '/images/testimonials/pexels-gabby-k-5876695.jpg',
    content: 'The hands-on projects and personalized feedback from instructors made learning SQL enjoyable and effective. I now use these skills daily in my development work.'
  }
];

// Skeleton loading component
function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        <div className="ml-4">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="mt-6">
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = testimonial.image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [testimonial.image]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 relative">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          {imageError ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              <span className="text-2xl">?</span>
            </div>
          ) : (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
      <div className="mt-6">
        <Link
          to="/contact"
          className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm"
        >
          GET IN TOUCH
        </Link>
      </div>
    </div>
  );
}

function Testimonials() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleTestimonials, setVisibleTestimonials] = useState([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Progressive loading of testimonials
    const loadTestimonials = async () => {
      // Show loading state
      setIsLoading(true);

      // Load testimonials in batches
      const batchSize = 3;
      for (let i = 0; i < testimonials.length; i += batchSize) {
        const batch = testimonials.slice(0, i + batchSize);
        setVisibleTestimonials(batch);
        if (i + batchSize < testimonials.length) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      // Hide loading state
      setIsLoading(false);
    };

    loadTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              What our learners say
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Empowering SQL skills for everyone
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Show skeleton loading cards
              Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <SkeletonCard />
                </div>
              ))
            ) : (
              // Show actual testimonials with staggered animation
              visibleTestimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="transform transition-all duration-500 opacity-0 translate-y-4 animate-fade-in-up"
                  style={{ 
                    animationDelay: `${testimonial.id * 100}ms`,
                    animationFillMode: 'forwards' 
                  }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Start your SQL journey today!
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              GET IN TOUCH
            </Link>
            <Link
              to="/lessons"
              className="inline-block border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              VIEW COURSES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials; 