import { useEffect, useState } from 'react';
import { FaComments } from 'react-icons/fa';
import { TIDIO_PUBLIC_KEY } from '../config/chat';

const TidioChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Tidio script
    const script = document.createElement('script');
    script.src = `//code.tidio.co/${TIDIO_PUBLIC_KEY}.js`;
    script.async = true;

    script.onload = () => {
      console.log('Tidio script loaded');
      setIsLoaded(true);
      
      // Wait for Tidio to be fully initialized
      const checkTidio = setInterval(() => {
        if (window.tidioChatApi) {
          console.log('Tidio chat API initialized');
          window.tidioChatApi.hide();
          clearInterval(checkTidio);
        }
      }, 100);

      // Clear interval after 5 seconds if Tidio doesn't load
      setTimeout(() => clearInterval(checkTidio), 5000);
    };

    script.onerror = (error) => {
      console.error('Error loading Tidio script:', error);
      setIsLoaded(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.tidioChatApi) {
        window.tidioChatApi.hide();
      }
      delete window.tidioChatApi;
    };
  }, []);

  const toggleChat = () => {
    console.log('Toggle chat clicked', { isLoaded, isOpen });
    console.log('Tidio API available:', !!window.tidioChatApi);

    if (window.tidioChatApi) {
      try {
        if (isOpen) {
          console.log('Attempting to hide chat');
          window.tidioChatApi.hide();
          setIsOpen(false);
        } else {
          console.log('Attempting to show chat');
          window.tidioChatApi.show();
          window.tidioChatApi.open();
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error toggling chat:', error);
      }
    } else {
      console.warn('Tidio chat API not available');
    }
  };

  return (
    <button
      onClick={toggleChat}
      className={`fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label="Chat with us"
      disabled={!isLoaded}
    >
      <FaComments className="text-2xl" />
      <span className="sr-only">Chat with us</span>
    </button>
  );
};

export default TidioChat; 