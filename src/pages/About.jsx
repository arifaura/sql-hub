import { FaGithub, FaLinkedin, FaCode, FaDatabase, FaGraduationCap } from 'react-icons/fa';

function About() {
  const features = [
    {
      icon: <FaCode className="w-6 h-6" />,
      title: 'Interactive Learning',
      description: 'Practice SQL with our interactive editor and get instant feedback on your queries.'
    },
    {
      icon: <FaDatabase className="w-6 h-6" />,
      title: 'Real-world Scenarios',
      description: 'Work with realistic database scenarios and learn practical SQL skills.'
    },
    {
      icon: <FaGraduationCap className="w-6 h-6" />,
      title: 'Structured Curriculum',
      description: 'Follow our carefully designed curriculum from basic to advanced SQL concepts.'
    }
  ];

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Lead Developer',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    },
    {
      name: 'Jane Smith',
      role: 'SQL Expert',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      github: 'https://github.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith'
    },
    {
      name: 'Mike Johnson',
      role: 'Content Creator',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      github: 'https://github.com/mikejohnson',
      linkedin: 'https://linkedin.com/in/mikejohnson'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About SQL Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're passionate about making SQL learning accessible, interactive, and enjoyable for everyone.
            Our platform combines modern technology with practical learning approaches.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="p-2 bg-brand/10 dark:bg-brand/20 rounded-lg text-brand inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            Our mission is to empower developers and data enthusiasts with the skills they need to master SQL.
            We believe in learning by doing, which is why we've created an interactive platform that combines
            theoretical knowledge with practical exercises.
          </p>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The passionate people behind SQL Hub
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {member.role}
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 