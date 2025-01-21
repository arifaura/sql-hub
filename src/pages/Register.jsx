import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import accountProtection from '../assets/img/Signup.svg';
import { toast } from 'react-hot-toast';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { register, googleSignIn, facebookSignIn } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (formData.password.length < 6) {
            toast.error('Password should be at least 6 characters');
            return;
        }
        setIsLoading(true);
        try {
            await register(formData.name, formData.email, formData.password);
        } catch (error) {
            // Error handling is done in the auth context
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await googleSignIn();
        } catch (error) {
            // Error handling is done in the auth context
            setIsLoading(false);
        }
    };

    const handleFacebookSignIn = async () => {
        setIsLoading(true);
        try {
            await facebookSignIn();
        } catch (error) {
            // Error handling is done in the auth context
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand/5 to-brand/10 dark:from-dark-primary dark:to-dark-secondary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white dark:bg-dark-accent rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="hidden lg:block relative">
                            <img
                                src={accountProtection}
                                alt="Account Protection"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        {/* Form Section */}
                        <div className="p-8 lg:p-12">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create your account</h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-brand hover:text-brand-dark transition-colors">
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="space-y-3 mb-8">
                                <button
                                    type="button"
                                    onClick={handleGoogleSignIn}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaGoogle className="w-5 h-5 text-red-500" />
                                    <span>Sign up with Google</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleFacebookSignIn}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaFacebook className="w-5 h-5 text-blue-600" />
                                    <span>Sign up with Facebook</span>
                                </button>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-dark-accent text-gray-500 dark:text-gray-400">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-brand focus:border-brand dark:bg-dark-primary dark:text-white"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-brand focus:border-brand dark:bg-dark-primary dark:text-white"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-brand focus:border-brand dark:bg-dark-primary dark:text-white"
                                        placeholder="Create a password"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-brand focus:border-brand dark:bg-dark-primary dark:text-white"
                                        placeholder="Confirm your password"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        I agree to the{' '}
                                        <Link to="/terms" className="text-brand hover:text-brand-dark transition-colors">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link to="/privacy" className="text-brand hover:text-brand-dark transition-colors">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Creating account...' : 'Create account'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register; 