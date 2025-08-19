import "global";
import React, { useState, useRef, useEffect } from "react";
import { FileText, Clock, Image, Upload as UploadIcon } from "lucide-react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import {
  bgTrabalheConosco,
  LogoFarmaBem,
  LogoFlex,
  LogoFlexAtc,
  LogoSantoRemedio,
  Tapajos30anos,
} from "./assets";

// Componente de notificação personalizada para erros críticos
const ErrorNotification = ({ message }: { message: string }) => (
  <div className="flex items-start p-1">
    <div className="flex-shrink-0 text-red-500 text-2xl">⚠️</div>
    <div className="ml-3 font-medium">
      <p className="text-base text-red-700 font-bold">Erro na Candidatura</p>
      <p className="text-sm text-red-600 mt-1">{message}</p>
    </div>
  </div>
);

function App() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  //const DEV_API = process.env.REACT_APP_DEV_API

  const regex = /\b(interna|interno)\b/i

  const query = useQuery();
  const navigate = useNavigate();
  const positionFromURL = query.get("position");
  const jobIdFromURL = query.get("jobId");
  console.log(jobIdFromURL);
  console.log(positionFromURL);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    position: positionFromURL || "",
    jobId: jobIdFromURL || "",
    photo: null as File | null,
    address: "",

    //Novas Alterações
    cargo_atual: "",
    data_admissao: "",
    loja_setor: "",

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

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (positionFromURL || jobIdFromURL) {
      setFormData((prev) => ({
        ...prev,
        position: positionFromURL || prev.position,
        jobId: jobIdFromURL || prev.jobId,
      }));
    }
  }, [positionFromURL, jobIdFromURL]);

  useEffect(() => {
    const fetchAddressFromCep = async () => {
      if (formData.cep && formData.cep.replace(/[^0-9]/g, "").length === 8) {
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${formData.cep.replace(
              /[^0-9]/g,
              ""
            )}/json/`
          );
          if (!response.ok) {
            throw new Error("CEP não encontrado");
          }
          const data = await response.json();

          if (data.erro) {
            toast.error("CEP não encontrado");
            return;
          }

          setFormData((prev) => ({
            ...prev,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
            estado: data.uf || prev.estado,
            address: data.logradouro || prev.address,
          }));
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          toast.error("Erro ao buscar endereço pelo CEP");
        }
      }
    };

    fetchAddressFromCep();
  }, [formData.cep]);

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

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const requiredFields: (keyof typeof formData)[] = [
      "jobId",
      "fullName",
      "email",
      "cpf",
      "cep",
      "phone",
      "address",
      "cidade",
      "estado",
      "bairro",
    ];

    // Validar campos obrigatórios
    for (const field of requiredFields) {
      if (!formData[field]) {
        errors[field] = `Campo obrigatório`;
      }
    }

    // Validar formato de e-mail
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Formato de e-mail inválido";
    }

    // Validar CPF
    if (formData.cpf) {
      const cpf = formData.cpf.replace(/[.-]/g, "");
      if (cpf.length !== 11) {
        errors.cpf = "CPF deve conter 11 dígitos";
      }
    }

    // Validar se os arquivos foram enviados
    if (!formData.photo) {
      errors.photo = "Por favor, adicione uma foto";
    }

    if (!formData.cv) {
      errors.cv = "Por favor, anexe seu currículo";
    }

    //Validar campo vazio de cargo atual
    if (regex.test(positionFromURL ?? '')) {
      if (!formData.cargo_atual)
        errors.cargo_atual = "Por favor, informe seu cargo atual"

      if (!formData.data_admissao)
        errors.cargo_atual = "Por favor, informe sua data de admissão"

      if (!formData.loja_setor)
        errors.loja_setor = "Por favor, informe seu setor ou sua loja"
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário antes de enviar");
      return;
    }

    setIsSubmitting(true);

    const candidateId = uuidv4();
    console.log("Candidate ID:", candidateId);

    const formDataToSend = new FormData();
    const cleanedCpf = formData.cpf.replace(/[.-]/g, "");
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
    formDataToSend.append("is_disponivel", formData.availability);

    formDataToSend.append('cargo_atual', formData.cargo_atual)
    formDataToSend.append('data_admissao', formData.data_admissao)
    formDataToSend.append('loja_setor', formData.loja_setor)

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

      // Obter o texto da resposta primeiro
      const responseText = await response.text();

      console.log(responseText + "")

      // Tentar analisar como JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (_jsonError) {
        // Se não for JSON válido, usar o texto bruto
        responseData = { message: responseText };
      }

      if (!response.ok) {
        // Tratamento específico para o erro de candidato não válido
        if (responseData.error === "o candidato não é um funcionário válido") {
          showErrorNotification(
            "CPF não cadastrado como funcionário válido. Verifique seu CPF ou entre em contato com o RH."
          );
          return;
        }
        // Tratamento para outros erros
        const errorMessage =
          responseData.error ||
          responseData.message ||
          `Erro ${response.status}: Falha ao enviar candidatura`;
        throw new Error(errorMessage);
      }

      /*console.log("Candidatura enviada com sucesso!");*/
      toast.success("Candidatura enviada com sucesso!");
      // Redirecionar para a página principal após mostrar o toast
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: unknown) {
      console.error("Erro ao enviar dados:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao enviar candidatura";

      // Toast com mais destaque para erros
      console.log(errorMessage)
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para exibir notificação de erro personalizada
  const showErrorNotification = (message: string) => {
    toast.error(<ErrorNotification message={message} />, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "error-toast-container",
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgTrabalheConosco})`,
        backgroundColor: "#e0e0e0",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-xl"
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
              className={`w-32 h-32 border-2 border-dashed ${formErrors.photo ? "border-red-500" : "border-gray-300"
                } rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#11833b] transition-colors duration-200`}
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
                      <UploadIcon
                        className={`w-8 h-8 ${formErrors.photo ? "text-red-500" : "text-gray-400"
                          }`}
                      />
                      <span
                        className={`mt-2 text-sm ${formErrors.photo ? "text-red-500" : "text-gray-500"
                          }`}
                      >
                        Upload
                      </span>
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
            {formErrors.photo && (
              <p className="text-red-500 text-xs mt-1">{formErrors.photo}</p>
            )}
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
              className={`w-full p-2 border ${formErrors.fullName ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
              required
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
            )}
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
              className={`w-full p-2 border ${formErrors.jobId ? "border-red-500" : "border-gray-300"
                } rounded bg-gray-100 text-gray-700`}
            />
            {!formData.position && (
              <p className="text-xs text-red-500 mt-1">
                Por favor, selecione uma vaga na página de vagas primeiro.
              </p>
            )}
            {formErrors.jobId && (
              <p className="text-red-500 text-xs mt-1">{formErrors.jobId}</p>
            )}
          </div>

          {/*NOVAS ALTERAÇÕES*/}

          {regex.test(positionFromURL ?? '') && (
            <>
              <div>
                <label
                  htmlFor="cargo_atual"
                  className="block text-sm font-medium text-[#11833b] mb-1"
                >
                  Cargo atual na empresa
                </label>
                <input
                  id="cargo_atual"
                  type="text"
                  value={formData.cargo_atual}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${formErrors.cargo_atual ? "border-red-500" : "border-gray-300"
                    } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
                />
                {formErrors.cargo_atual && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.cargo_atual}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="data_admissao"
                  className="block text-sm font-medium text-[#11833b] mb-1"
                >
                  Data de Admissão
                </label>
                <input
                  id="data_admissao"
                  type="date"
                  value={formData.data_admissao}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${formErrors.data_admissao ? "border-red-500" : "border-gray-300"
                    } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}

                />
                {formErrors.data_admissao && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.data_admissao}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="loja_setor"
                  className="block text-sm font-medium text-[#11833b] mb-1"
                >
                  Setor ou Loja atuante
                </label>
                <input
                  id="loja_setor"
                  type="text"
                  value={formData.loja_setor}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${formErrors.loja_setor ? "border-red-500" : "border-gray-300"
                    } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}

                />
                {formErrors.loja_setor && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.loja_setor}</p>
                )}
              </div>
            </>
          )}

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
              className={`w-full p-2 border ${formErrors.address ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
              required
            />
            {formErrors.address && (
              <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
            )}
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
              className={`w-full p-2 border ${formErrors.cep ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
              required
            />
            {formErrors.cep && (
              <p className="text-red-500 text-xs mt-1">{formErrors.cep}</p>
            )}
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
              className={`w-full p-2 border ${formErrors.bairro ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
            />
            {formErrors.bairro && (
              <p className="text-red-500 text-xs mt-1">{formErrors.bairro}</p>
            )}
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
              className={`w-full p-2 border ${formErrors.cidade ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
            />
            {formErrors.cidade && (
              <p className="text-red-500 text-xs mt-1">{formErrors.cidade}</p>
            )}
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
              className={`w-full p-2 border ${formErrors.estado ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
            />
            {formErrors.estado && (
              <p className="text-red-500 text-xs mt-1">{formErrors.estado}</p>
            )}
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
                className={`w-full p-2 border ${formErrors.cpf ? "border-red-500" : "border-gray-300"
                  } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
                required
              />
              {formErrors.cpf && (
                <p className="text-red-500 text-xs mt-1">{formErrors.cpf}</p>
              )}
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
                className={`w-full p-2 border ${formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
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
                className={`w-full p-2 border ${formErrors.phone ? "border-red-500" : "border-gray-300"
                  } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
                required
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
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
              className={`w-full p-2 border ${formErrors.cv ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
              required
            />
            {formErrors.cv && (
              <p className="text-red-500 text-xs mt-1">{formErrors.cv}</p>
            )}
            {formData.cv && (
              <p className="text-green-600 text-xs mt-1">
                Arquivo selecionado: {formData.cv.name}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className={`bg-[#11833b] text-white px-12 py-3 rounded-lg hover:bg-[#0d6a2d] transition-colors duration-300 font-medium ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </span>
            ) : (
              "Enviar Candidatura"
            )}
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <img
            src={LogoFarmaBem}
            alt="Farmácia Tapajós 1"
            className="w-full h-30 object-cover rounded-lg"
          />
          <img
            src={LogoFlex}
            alt="Farmácia Tapajós 2"
            className="w-full h-30  rounded-lg"
          />
          <img
            src={LogoSantoRemedio}
            alt="Farmácia Tapajós 3"
            className="w-full h-30  rounded-lg"
          />
          <img
            src={LogoFlexAtc}
            alt="Farmácia Tapajós 4"
            className="w-full h-30  rounded-lg"
          />

          <img
            src={Tapajos30anos}
            alt="Farmácia Tapajós 4"
            className="w-full h-30   rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
