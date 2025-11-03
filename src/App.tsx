import "global";
import React, { useState, useRef, useEffect } from "react";
import { FileText, Clock, Image, Upload as UploadIcon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { bgTrabalheConosco, LogoFarmaBem, LogoFlex, LogoFlexAtc, LogoSantoRemedio, Tapajos30anos, } from "./assets";
import Modal from "./components/Modal/Modal";
import ErrorNotification from "./components/utils/ErrorNotification";
import FormOperador from "./components/views/FormOperador";
import FormGargista from "./components/views/FormGargista";
import FormFarmaceutico from "./components/views/FormFarmaceutico";
import MainForm from "./components/views/MainForm";
import { useForm } from "./hooks/useForm";
import FormConsultorCaixa from "./components/views/FormConsultorCaixa";
import FormConsultorDeVendas from "./components/views/FormConsultorDeVendas";
import FormAuxiliarEstoque from "./components/views/FormAuxiliarEstoque";

function App() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const navigate = useNavigate();
  const positionFromURL = query.get("position");
  const jobIdFromURL = query.get("jobId");
  const jobVideo = query.get("aprs");
  const jobDisc = query.get("disc");
  const jobForm_vaga = query.get("form_vaga");
  const jobForm_vaga_type = query.get("form_vaga_type");

  const [modal, setModal] = useState(false)
  const [termo, setTermo] = useState(false)
  const [referecne_check, setReferenceCheck] = useState(false)
  const [indexPage, setIndexPage] = useState(0)
  const [isNextPage, setIsNextPage] = useState<boolean>(jobForm_vaga != 'true')
  const [acertos, setAcertos] = useState(0)

  //const DEV_API = process.env.REACT_APP_DEV_API

  const regex = /\b(interna|interno)\b/i

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
    termo: false,
    form_file: null as File | null,
    form_disc: null as File | null,

    name_reference: "",
    loja_setor_reference: "",
    video_apresentation: null as File | null,
    matricula: "",

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

  useEffect (() =>{
    if (jobForm_vaga_type) 
      console.log(jobForm_vaga_type)
  })

  useEffect(() => {
    setFormData((prev) => ({
      ...prev, termo: termo
    }))
  }, [setTermo])

  useEffect(() => {
    if (positionFromURL || jobIdFromURL) {
      setFormData((prev) => ({
        ...prev,
        position: positionFromURL || prev.position,
        jobId: jobIdFromURL?.trim() || prev.jobId.trim(),
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

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.type.startsWith("video/")
      ) {
        setFormData((prev) => ({ ...prev, video_apresentation: file }));
      } else {
        alert("Por favor, selecione um arquivo de vídeo válido (ex: MP4, WEBM, OGG).");
      }
    }
  };

  const handleTermoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === "application/pdf" || file.type === "aplication/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setFormData((prev) => ({ ...prev, form_file: file }))
      }
    }
  }

    const handleFormDiscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFormData((prev) => ({ ...prev, form_disc: file }));
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

  function handleRadioChange(e: any) {
    setReferenceCheck(e.target.checked)
    if (e.target.value == 'Não')
      setReferenceCheck(false)
  }

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
      "bairro"
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

    if (jobDisc != 'null' && !formData.form_disc){
        errors.disc = "Por favor, anexe o formulário disc";
      }

    //Validar campo vazio de cargo atual
    if (regex.test(positionFromURL ?? '')) {
      if (!formData.cargo_atual)
        errors.cargo_atual = "Por favor, informe seu cargo atual"

      if (!formData.data_admissao)
        errors.data_admissao = "Por favor, informe sua data de admissão"

      const dt = new Date()
      const ano = dt.getFullYear()
      const mes = dt.getMonth() + 1
      const dia = dt.getDate()
      
      const st = `${ano}-${mes}-${dia}`
      const dt_full = Date.parse(st)
      const date = Date.parse(formData.data_admissao)

      const dt_real = ((((dt_full - date) / 1000) / 60) / 60) / 24
      if(dt_real < 180){
        errors.data_admissao = "Necessita ter 6 meses completos na empresa para se candidatar"
      }

      if (!formData.loja_setor)
        errors.loja_setor = "Por favor, informe seu setor ou sua loja"

      if (!formData.form_file)
        errors.form_file = "Por favor, anexe o currículo";

      if (!formData.matricula)
        errors.matricula = "Por favor, informe sua matrícula"
      
    }

    console.log(errors)
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {

    setIsSubmitting(true);
    const candidateId = uuidv4();

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

    //eliminar esse campo no backend
    formDataToSend.append("is_primeiraexperiencia", String(formData.checkbox));
    formDataToSend.append("is_disponivel", formData.availability);

    formDataToSend.append('cargo_atual', formData.cargo_atual)
    formDataToSend.append('data_admissao', formData.data_admissao)
    formDataToSend.append('loja_setor', formData.loja_setor)
    formDataToSend.append('name_reference', formData.name_reference)
    formDataToSend.append('loja_setor_reference', formData.loja_setor_reference)
    formDataToSend.append('matricula', formData.matricula)
    formDataToSend.append('points', String(acertos))

    formDataToSend.append('termo', String(formData.termo))

    if (formData.form_file) {
      formDataToSend.append('file_form', formData.form_file)
    }
    if (formData.photo) {
      formDataToSend.append("foto_perfil", formData.photo);
    }
    if (formData.cv) {
      formDataToSend.append("file", formData.cv);
    }
    if (formData.form_disc) {
      formDataToSend.append("form_disc", formData.form_disc);
    }
    if (formData.video_apresentation) {
      formDataToSend.append("video", formData.video_apresentation);
    }

    console.log(formData)
    //toast.success("Candidatura enviada com sucesso!");

    setTimeout(() => {
      navigate("/");
    }, 2000);


    try {

      const response = await fetch(
        "https://api.rh.grupotapajos.com.br/candidatos",
        //"http://localhost:8000/candidatos",
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
      //setIsSubmitting(false);
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

  const handleModal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário antes de enviar");
      return;
    }

    setModal(!modal)
  }

  function handlePageForm (i:number, e:any){

     e.preventDefault()

      if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário antes de enviar");
      return;
    }

     if (e) e.preventDefault();

        if(i<0 || i>=formComponents.length) return

        if (jobForm_vaga_type == 'operador'){
          setIndexPage(i)
        }
        if (jobForm_vaga_type == 'garagista'){
          setIndexPage(i + 1)
        }

        if (jobForm_vaga_type == 'farmaceutico'){
          setIndexPage(i + 2)
        }

        if (jobForm_vaga_type == 'c_caixa'){
          setIndexPage(i + 3)
        }

        if (jobForm_vaga_type == 'c_vendas'){
          setIndexPage(i + 4)
        }

        if (jobForm_vaga_type == 'auxiliar'){
          setIndexPage(i + 4)
        }

        setIsNextPage(true)

  }

  const formComponents = [<MainForm fileInputRef={fileInputRef} formData={formData} formErrors={formErrors} handleCvChange={handleCvChange} handleInputChange={handleInputChange} handleModal={handleModal} handlePhotoChange={handlePhotoChange} handleRadioChange={handleRadioChange} handleTermoFile={handleTermoFile} handleVideoChange={handleVideoChange} isSubmitting={isSubmitting} jobDisc={jobDisc} jobVideo={jobVideo} photoPreview={photoPreview} positionFromURL={positionFromURL} referecne_check={referecne_check} isNextPage={isNextPage} handlePageForm={handlePageForm} indexPage={indexPage} handleFormDisc={handleFormDiscChange}/>,  <FormOperador handleModal={handleModal} isSubmitting={isSubmitting} setAcertos={setAcertos}/>, <FormGargista  handleModal={handleModal} isSubmitting={isSubmitting} setAcertos={setAcertos} />, <FormFarmaceutico  handleModal={handleModal} isSubmitting={isSubmitting} setAcertos={setAcertos}/>, <FormConsultorCaixa handleModal={handleModal} isSubmitting={isSubmitting} setAcertos={setAcertos}/>, <FormConsultorDeVendas handleModal={handleModal} isSubmitting={isSubmitting} setAcertos={setAcertos}/>, <FormAuxiliarEstoque handleModal={handleModal} isSubmitting={isSubmitting} setAcertos={setAcertos}/>]

  const {changeStep, currentComponent, currentStep, isLastStep} = useForm(formComponents)

  return (
    <>
      {modal && (
        <Modal handleModal={handleModal} handleSubmit={handleSubmit} setTermo={setTermo} setFormData={setFormData} data={formData} />
      )}

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

            {formComponents[indexPage]}

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
    </>

  );
}

export default App;
