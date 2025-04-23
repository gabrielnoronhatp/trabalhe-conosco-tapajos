import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import JobList from './JobList';
import { toast } from 'react-toastify';

const SuccessPage = () => {
  React.useEffect(() => {
    // Mostrar toast na página de sucesso
    toast.success("Candidatura enviada com sucesso! Redirecionando...");
    
    // Redirecionar para a página principal após alguns segundos
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#e0e0e0] flex items-center justify-center p-4">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="text-5xl text-green-600 mb-4">✅</div>
        <h1 className="text-2xl font-bold text-[#11833b] mb-4">Candidatura Enviada com Sucesso!</h1>
        <p className="text-gray-600 mb-6">Obrigado por se candidatar para trabalhar conosco. Entraremos em contato em breve.</p>
        <a href="/" className="inline-block bg-[#11833b] text-white px-6 py-2 rounded-lg hover:bg-[#0d6a2d] transition-colors duration-200">
          Voltar para Vagas
        </a>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/jobs" element={<App />} />
        <Route path="/apply" element={<App />} />
        <Route path="/candidatura-enviada" element={<SuccessPage />} />
        <Route path="/" element={<JobList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 