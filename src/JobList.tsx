import React, { useState } from 'react';
import { analista } from './assets';
const jobs = [
  { id: 1, title: 'Desenvolvedor', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Designer', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Analista', image: 'https://via.placeholder.com/150' },
];

const JobList = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image: any) => {
    console.log(image);
    setSelectedImage(image);

  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex  justify-center p-4"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <div className="w-full max-w-2xl ">
        <h1 className="text-3xl font-bold text-[#11833b] mb-8 text-center">Vagas Disponíveis</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={analista} 
                alt={job.title} 
                className="w-full h-32 object-cover transition-transform duration-300 transform hover:scale-125 cursor-pointer" 
                onClick={() => openModal(analista)}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#11833b]">{job.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <img src={selectedImage} alt="Job" className="max-w-full h-auto" />
            <div className="flex justify-between mt-4">
              <button onClick={closeModal} className="bg-[#11833b] text-white px-4 py-2 rounded">Fechar</button>
              <a href="/" className="bg-[#11833b] text-white px-4 py-2 rounded">Aplicar</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList; 