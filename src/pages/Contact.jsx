import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const offices = [
    {
      id: 1,
      city: 'New York',
      address: '123 Broadway, New York, NY 10012',
      phone: '+1 (555) 123-4567',
      email: 'ny@sqlhub.com',
      timing: '9:00 AM - 6:00 PM EST',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      city: 'London',
      address: '456 Oxford Street, London, UK W1C 1AP',
      phone: '+44 20 7123 4567',
      email: 'london@sqlhub.com',
      timing: '9:00 AM - 6:00 PM GMT',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    {
      id: 3,
      city: 'Singapore',
      address: '789 Marina Bay, Singapore 018956',
      phone: '+65 6789 0123',
      email: 'singapore@sqlhub.com',
      timing: '9:00 AM - 6:00 PM SGT',
      coordinates: { lat: 1.3521, lng: 103.8198 }
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOfficeSelect = (office) => {
    setSelectedOffice(office);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand to-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              We're here to help with any questions about our SQL learning platform
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-12 bg-brand-light dark:bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Support */}
            <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Email Support</h3>
              <p className="text-gray-600 dark:text-dark-secondary mb-4">
                Get in touch with our support team via email
              </p>
              <a
                href="mailto:support@sqlhub.com"
                className="text-brand hover:text-brand-dark transition-colors"
              >
                support@sqlhub.com
              </a>
            </div>

            {/* Phone Support */}
            <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Phone Support</h3>
              <p className="text-gray-600 dark:text-dark-secondary mb-4">
                Call us directly for immediate assistance
              </p>
              <a
                href="tel:+1234567890"
                className="text-brand hover:text-brand-dark transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>

            {/* Live Chat */}
            <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaComments className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Live Chat</h3>
              <p className="text-gray-600 dark:text-dark-secondary mb-4">
                Chat with our support team in real-time
              </p>
              <button
                className="text-brand hover:text-brand-dark transition-colors"
                onClick={() => toast.success('Live chat feature coming soon!')}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Office Locations */}
      <section className="py-16 bg-white dark:bg-dark-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand dark:bg-dark-accent dark:text-white dark:border-gray-600 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand dark:bg-dark-accent dark:text-white dark:border-gray-600 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand dark:bg-dark-accent dark:text-white dark:border-gray-600 ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand dark:bg-dark-accent dark:text-white dark:border-gray-600 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-brand text-white py-2 px-4 rounded-lg hover:bg-brand-dark transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Our Offices</h2>
              <div className="space-y-8">
                {offices.map((office) => (
                  <div
                    key={office.id}
                    className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{office.city}</h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p>{office.address}</p>
                      <p className="mt-4">
                        <span className="font-medium">Phone:</span> {office.phone}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{' '}
                        <a
                          href={`mailto:${office.email}`}
                          className="text-brand hover:text-brand-dark transition-colors"
                        >
                          {office.email}
                        </a>
                      </p>
                      <p className="mt-4">
                        <span className="font-medium">Hours:</span> {office.timing}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-brand-light dark:bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                How quickly can I expect a response?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We typically respond to all inquiries within 24 hours during business days. For urgent matters, 
                please use our phone support.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Do you offer technical support?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, our technical support team is available to help with any issues related to our platform or SQL queries.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Can I request a feature?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely! We welcome feature requests and feedback from our community. Use the contact form above to submit your ideas.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                What are your business hours?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is available Monday through Friday, 9:00 AM to 6:00 PM in your local timezone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact; 