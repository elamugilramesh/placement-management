import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to manage the search term

  useEffect(() => {
    // TODO: Fetch companies from API
    setCompanies([
      { id: 1, name: 'Wipro', logo: 'wipro-logo.png' },
      { id: 2, name: 'Infosys', logo: 'infosys-logo.png' },
      { id: 3, name: 'Cognizant', logo: 'cognizant-logo.png' },
      { id: 4, name: 'TCS', logo: 'tcs-logo.png' }, // Added TCS
      { id: 5, name: 'HCL Technologies', logo: 'hcl-logo.png' }, // Added HCL
      { id: 6, name: 'Accenture', logo: 'accenture-logo.png' }, // Added Accenture
      { id: 7, name: 'Capgemini', logo: 'capgemini-logo.png' }, // Added Capgemini
    ]);
  }, []);

  // Filter companies based on the search term
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Companies</h2>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search companies..."
          className="p-3 w-full md:w-1/3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Link
            key={company.id}
            to={`/companies/${company.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {/* Placeholder for company logo */}
                <span className="text-xl font-bold">{company.name[0]}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{company.name}</h3>
                <p className="text-gray-600">View materials and resources</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
