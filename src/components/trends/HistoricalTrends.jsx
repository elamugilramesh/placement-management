import { useState, useEffect } from 'react';

const HistoricalTrends = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    // TODO: Fetch historical trends from API
    setTrends([
      {
        id: 1,
        year: '2023',
        companies: [
          { name: 'Wipro', visited: true, hired: 15 },
          { name: 'Infosys', visited: true, hired: 20 },
          { name: 'Cognizant', visited: true, hired: 18 },
        ],
      },
      // Add more years
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Historical Trends</h2>
      
      {trends.map((trend) => (
        <div key={trend.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-2xl font-semibold mb-4">Year {trend.year}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campus Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students Hired
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trend.companies.map((company, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.visited ? '✓' : '✗'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{company.hired}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoricalTrends;