import React, { useState, useRef } from 'react';
import { FileText, Clock, Plus, Image } from 'lucide-react';
import InputMask from 'react-input-mask';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    photo: null as File | null,
    address: '',
    availability: '',
    cpf: '',
    rg: '',
    experience: '',
    education: '',
    skills: '',
    email: '',
    phone: '',
    cv: null as File | null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, photo: file }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecione apenas arquivos de imagem.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white bg-opacity-75 backdrop-blur-sm p-8 rounded-lg shadow-xl"
      >
        <h1 className="text-3xl font-bold text-[#11833b] mb-8 text-center">Tapajós Trabalhe Conosco</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Escolha sua melhor foto
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#11833b] transition-colors duration-200"
              style={{
                backgroundImage: photoPreview ? `url(${photoPreview})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!photoPreview && (
                <>
                  {formData.photo ? (
                    <Image className="w-8 h-8 text-gray-400" />
                  ) : (
                    <>
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">Upload</span>
                    </>
                  )}
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Cargo Desejado
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            >
              <option value="">Selecione...</option>
              <option value="desenvolvedor">Desenvolvedor</option>
              <option value="designer">Designer</option>
              <option value="analista">Analista</option>
              <option value="gerente">Gerente de Projetos</option>
              <option value="marketing">Marketing Digital</option>
              <option value="vendas">Vendas</option>
              <option value="rh">Recursos Humanos</option>
              <option value="financeiro">Financeiro</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Endereço Completo
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Disponibilidade <Clock className="inline-block w-4 h-4" />
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            >
              <option value="">Selecione...</option>
              <option value="total">Disponibilidade Total</option>
              <option value="comercial">Horário Comercial</option>
              <option value="noite">Período Noturno</option>
              <option value="dia">Período Diurno</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#11833b] mb-1">
                CPF
              </label>
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#11833b] mb-1">
                RG
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#11833b] mb-1">
                E-mail
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#11833b] mb-1">
                Telefone
              </label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Experiência Profissional
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              rows={4}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Formação Acadêmica
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              rows={3}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Habilidades e Competências
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              rows={3}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Anexar Currículo <FileText className="inline-block w-4 h-4" />
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-[#11833b] text-white px-12 py-3 rounded-lg hover:bg-[#0d6a2d] transition-colors duration-300 font-medium"
          >
            Enviar Candidatura
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
            alt="Farmácia Tapajós 1"
            className="w-full h-24 object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
            alt="Farmácia Tapajós 2"
            className="w-full h-24 object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
            alt="Farmácia Tapajós 3"
            className="w-full h-24 object-cover rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default App;