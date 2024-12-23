import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // TODO: Fetch company details and materials from API
    setCompany({
      id,
      name: 'Sample Company',
      description: 'Company description goes here',
    });
    
    setMaterials([
      { id: 1, title: 'Technical Questions', type: 'pdf', fileUrl: '/files/pdf1.pdf' },
      { id: 2, title: 'Aptitude Test Sample', type: 'pdf', fileUrl: '/files/pdf2.pdf' },
      { id: 3, title: 'Interview Tips', type: 'pdf', fileUrl: '/files/pdf3.pdf' },
    ]);
  }, [id]);

  const handleDownload = (fileUrl) => {
    // Trigger the download by creating a link and programmatically clicking it
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();  // Sets the filename to be the last part of the URL
    link.click();
  };

  if (!company) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{company.name}</h2>
      <p className="text-gray-600 mb-8">{company.description}</p>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Study Materials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h4 className="text-xl font-semibold mb-2">{material.title}</h4>
              <p className="text-gray-600 mb-4">Type: {material.type}</p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => handleDownload(material.fileUrl)}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
