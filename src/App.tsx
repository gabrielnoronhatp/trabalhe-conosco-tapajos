import "global";
import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Clock,
  Plus,
  Image,
  Upload as UploadIcon,
} from "lucide-react";
import InputMask from "react-input-mask";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAYLYIABHP5ULXZ2HA",
    secretAccessKey: "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",
  },
});

function App() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const positionFromURL = query.get("position");
  const jobIdFromURL = query.get("jobId");
  console.log(jobIdFromURL);
  console.log(positionFromURL);
  const [formData, setFormData] = useState({
    fullName: "",
    position: positionFromURL || "",
    jobId: jobIdFromURL || "",
    photo: null as File | null,
    address: "",
    availability: "",
    experience: "",
    cpf: "",
    rg: "",
    checkbox: false,
    education: "",
    skills: "",
    email: "",
    phone: "",
    cv: null as File | null,
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: "",
  });

  useEffect(() => {
    if (positionFromURL || jobIdFromURL) {
      setFormData((prev) => ({
        ...prev,
        position: positionFromURL || prev.position,
        jobId: jobIdFromURL || prev.jobId,
      }));
    }
  }, [positionFromURL, jobIdFromURL]);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, photo: file }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor, selecione apenas arquivos de imagem.");
      }
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFormData((prev) => ({ ...prev, cv: file }));
      } else {
        alert("Por favor, selecione um arquivo PDF ou DOC.");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário submetido!", formData);

    // Verificação de campos obrigatórios
    const requiredFields = [
      "jobId",
      "fullName",
      "email",
      "cpf",
      "cep",
      "photo",
      "cv",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`O campo ${field} é obrigatório.`);
        return;
      }
    }

    // Gera um ID único para o candidato
    const candidateId = uuidv4();
    console.log("Candidate ID:", candidateId);

    const formDataToSend = new FormData();
    const cleanedCpf = formData.cpf.replace(/[.\-]/g, "");
    formDataToSend.append("cpf", cleanedCpf);

    formDataToSend.append("vaga_id", formData.jobId);
    formDataToSend.append("nome_completo", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("cep", formData.cep);
    formDataToSend.append("bairro", formData.bairro);
    formDataToSend.append("cidade", formData.cidade);
    formDataToSend.append("estado", formData.estado);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("numero", formData.numero);
    formDataToSend.append("complemento", formData.complemento);
    formDataToSend.append("telefone", formData.phone);
    formDataToSend.append("is_primeiraexperiencia", String(formData.checkbox));
    formDataToSend.append(
      "is_disponivel",
      String(formData.availability === "total")
    );

    if (formData.photo) {
      formDataToSend.append("foto_perfil", formData.photo);
    }
    if (formData.cv) {
      formDataToSend.append("file", formData.cv);
    }

    try {
      const response = await fetch(
        "https://api.rh.grupotapajos.com.br/candidatos",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar candidatura");
      }

      console.log("Candidatura enviada com sucesso!");
      alert("Candidatura enviada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao enviar dados:", error);
      alert(`Erro ao enviar candidatura. Detalhes: ${error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white bg-opacity-75 backdrop-blur-sm p-8 rounded-lg shadow-xl"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-[#11833b] mb-8 text-center">
          Tapajós Trabalhe Conosco
        </h1>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#11833b] mb-1">
              Escolha sua melhor foto
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#11833b] transition-colors duration-200"
              style={{
                backgroundImage: photoPreview ? `url(${photoPreview})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!photoPreview && (
                <>
                  {formData.photo ? (
                    <Image className="w-8 h-8 text-gray-400" />
                  ) : (
                    <>
                      <UploadIcon className="w-8 h-8 text-gray-400" />
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
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Nome Completo
            </label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="checkbox"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              É sua primeira experiência?
            </label>
            <input
              id="checkbox"
              type="checkbox"
              checked={formData.checkbox}
              onChange={handleInputChange}
              className="w-4 h-4 text-[#11833b] border-gray-300 rounded focus:ring-[#11833b]"
            />{" "}
            <span className="ml-2">Sim</span>
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Cargo Desejado
            </label>
            <input
              id="position"
              type="text"
              value={formData.position}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
            />
            {!formData.position && (
              <p className="text-xs text-red-500 mt-1">
                Por favor, selecione uma vaga na página de vagas primeiro.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Endereço Completo
            </label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="cep"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              CEP
            </label>
            <InputMask
              id="cep"
              mask="99999-999"
              value={formData.cep}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="bairro"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Bairro
            </label>
            <input
              id="bairro"
              type="text"
              value={formData.bairro}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="cidade"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Cidade
            </label>
            <input
              id="cidade"
              type="text"
              value={formData.cidade}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Estado
            </label>
            <input
              id="estado"
              type="text"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="numero"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Número
            </label>
            <input
              id="numero"
              type="text"
              value={formData.numero}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="complemento"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Complemento
            </label>
            <input
              id="complemento"
              type="text"
              value={formData.complemento}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Disponibilidade <Clock className="inline-block w-4 h-4" />
            </label>
            <select
              id="availability"
              value={formData.availability}
              onChange={handleInputChange}
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
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-[#11833b] mb-1"
              >
                CPF
              </label>
              <InputMask
                id="cpf"
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="rg"
                className="block text-sm font-medium text-[#11833b] mb-1"
              >
                RG
              </label>
              <input
                id="rg"
                type="text"
                value={formData.rg}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#11833b] mb-1"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#11833b] mb-1"
              >
                Telefone
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Experiência Profissional
            </label>
            <textarea
              id="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              rows={4}
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="education"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Formação Acadêmica
            </label>
            <textarea
              id="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              rows={3}
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Habilidades e Competências
            </label>
            <textarea
              id="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              rows={3}
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="cv"
              className="block text-sm font-medium text-[#11833b] mb-1"
            >
              Anexar Currículo <FileText className="inline-block w-4 h-4" />
            </label>
            <input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-[#11833b] text-white px-12 py-3 rounded-lg hover:bg-[#0d6a2d] transition-colors duration-300 font-medium"
            onClick={handleSubmit}
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
