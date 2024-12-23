import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PeerExperiences = ({ handleFeedbackSubmit }) => {
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch peer experiences from API or set initial data
    setExperiences([
      {
        id: 1,
        company: 'Wipro',
        author: 'John Doe',
        date: '2024-02-15',
        content: 'My interview experience at Wipro...',
      },
      // Add more experiences
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Peer Experiences</h2>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{exp.company}</h3>
              <span className="text-gray-500">{exp.date}</span>
            </div>
            <p className="text-gray-600 mb-4">{exp.content}</p>
            <p className="text-sm text-gray-500">Shared by {exp.author}</p>
          </div>
        ))}
      </div>

      {/* Button for Feedback Page */}
      <button
        onClick={() => navigate('/feedback')}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Give Feedback
      </button>
    </div>
  );
};

export default PeerExperiences;
