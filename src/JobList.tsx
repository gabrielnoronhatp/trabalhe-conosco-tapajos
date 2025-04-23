import React, { useState, useEffect } from "react";
import { bannerTrabalheConosco } from "./assets";
import "../styles/globals.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Job {
  id: number;
  nome_vaga: string;
  localizacao: string;
  descricao: string;
  requisitos?: string;
  is_ativo: boolean;
  imagem_capa: string;
  tipo: string;
}

const JobList = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [openJobId, setOpenJobId] = useState<number | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const itemsToShow = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.rh.grupotapajos.com.br/vagas"
        );

        const responseText = await response.text();
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch (_jsonError) {
          responseData = { message: responseText };
        }

        if (!response.ok) {
          const errorMessage =
            responseData.error ||
            responseData.message ||
            `Erro ${response.status}: Falha ao carregar vagas`;
          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 7000,
          });
          setIsLoading(false);
          return;
        }

        const activeJobs = responseData.filter(
          (job: Job) => job.is_ativo === true
        );
        setJobs(activeJobs);

        const imagePromises = responseData.map((job: Job) =>
          fetchImage(job.imagem_capa.split("/").pop() || "")
        );
        const imageUrls = await Promise.all(imagePromises);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex(
        (prevIndex) => (prevIndex + 1) % Math.ceil(jobs.length / itemsToShow)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [jobs]);

  const filteredJobs = jobs.filter((job: Job) => {
    try {
      const matchesSearch = job.nome_vaga
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLocation =
        locationFilter === "" ||
        job.localizacao.toLowerCase().includes(locationFilter.toLowerCase());
      return matchesSearch && matchesLocation;
    } catch (error) {
      console.error("Error filtering jobs:", error);
      toast.warning("Erro ao filtrar algumas vagas.");
      return false;
    }
  });

  const closeModal = () => {
    setSelectedImage(null);
  };

  const toggleJobDetails = (jobId: number) => {
    try {
      setOpenJobId(openJobId === jobId ? null : jobId);
    } catch (error) {
      console.error("Error toggling job details:", error);
      toast.error("Erro ao exibir detalhes da vaga. Tente novamente.");
    }
  };

  const handleApply = (job: Job) => {
    try {
      navigate(
        `/jobs?position=${encodeURIComponent(
          job.nome_vaga
        )}&jobId=${encodeURIComponent(job.id)}`
      );
    } catch (error) {
      console.error("Error navigating to application form:", error);
      toast.error(
        "Erro ao acessar o formulário de candidatura. Tente novamente."
      );
    }
  };

  const fetchImage = async (imageName: string) => {
    try {
      const response = await fetch(
        `https://api.rh.grupotapajos.com.br/vagas/files/${imageName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      return response.url;
    } catch (error) {
      console.error("Error fetching image:", error);

      return ""; // Retornar uma URL de imagem padrão ou vazia
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#e0e0e0]">
      <div className="w-full">
        <div className="w-full h-[300px] relative overflow-hidden">
          <img
            src={bannerTrabalheConosco}
            alt="Banner Tapajós"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      {/* Sobre o Grupo Tapajós */}
      <div className="w-full mb-6 p-5 about-section">
        <h2 className="text-xl font-semibold text-[#007933] mb-2">
          Sobre o Grupo Tapajós
        </h2>
        <p className="text-gray-700 mb-2">
          O <strong>Grupo Tapajós</strong> é a maior distribuidora de
          medicamentos da Região Norte do Brasil, garantindo excelência no
          atendimento a fornecedores, clientes e consumidores finais. Com uma
          gestão sólida e ética, investimos continuamente em infraestrutura,
          tecnologia e capacitação profissional para oferecer um serviço de alto
          nível.
        </p>
        <p className="text-gray-700 mb-2">
          Nossa estrutura conta com <strong>06 Centros de Distribuição</strong>,
          mais de <strong>1.000 colaboradores</strong>, frota própria e um
          processo logístico eficiente, garantindo a entrega segura e ágil de
          produtos 100% adquiridos direto da indústria. Nosso compromisso é com
          a <strong>qualidade, credibilidade e satisfação dos clientes</strong>.
        </p>
        <h3 className="text-lg font-semibold text-[#007933] mb-2">
          Benefícios para nossos colaboradores
        </h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            ✅ <strong>Seguro de vida</strong>
          </li>
          <li>
            💊 <strong>Convênio com drogaria</strong>
          </li>
          <li>
            🩺 <strong>Plano de saúde e odontológico</strong>
          </li>
          <li>
            🍽️ <strong>Alimentação in loco</strong>
          </li>
          <li>
            🚌 <strong>Vale-transporte</strong>
          </li>
          <li>
            📈 <strong>Plano de progressão de carreira</strong>
          </li>
        </ul>
      </div>
      {/* Fim da seção Sobre o Grupo Tapajós */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="w-full mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Pesquisar por nome da vaga"
              className="delicate-input flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Pesquisar por localização"
              className="delicate-input flex-1"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
        </nav>
        {/* Lista de Vagas */}
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-[#007933] mb-6">
            Todas as Vagas{" "}
            {filteredJobs.length > 0 &&
              !isLoading &&
              `(${filteredJobs.length})`}
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <div className="loader">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007933]"></div>
                <p className="mt-4 text-[#007933]">Carregando vagas...</p>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="job-card p-4 text-center">
              <p className="text-gray-600">
                Nenhuma vaga encontrada com os filtros aplicados.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job: Job) => (
                <div
                  key={job.id}
                  className="job-card border border-gray-300 rounded-lg"
                >
                  <div
                    className="p-3 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleJobDetails(job.id)}
                  >
                    <div>
                      <h3 className="text-base font-medium text-[#11833b]">
                        {job.nome_vaga.toUpperCase()}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {job.localizacao}
                      </p>
                    </div>
                    <span className="text-[#11833b] text-lg">
                      {openJobId === job.id ? "−" : "+"}
                    </span>
                  </div>

                  {openJobId === job.id && (
                    <div className="p-3 pt-0 space-y-3">
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>{job.descricao}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requisitos
                            ?.split(",")
                            .map((req: string, i: number) => (
                              <span key={i} className="tag">
                                {req.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(job)}
                        className="inline-block text-sm bg-[#11833b] text-white px-4 py-2 rounded-lg hover:bg-[#0f6a32] transition-colors"
                      >
                        Candidatar-se
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Carrossel - só exibe se houver mais de uma vaga */}
      {jobs.length > 1 && (
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(jobs.length / itemsToShow) }).map(
              (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="job-carrousel">
                    {jobs
                      .slice(
                        slideIndex * itemsToShow,
                        (slideIndex + 1) * itemsToShow
                      )
                      .map((job: Job) => (
                        <div
                          key={job.id}
                          className="cards-job h-[500px] rounded-lg overflow-hidden shadow-md cursor-pointer"
                          onClick={() => handleApply(job)}
                        >
                          <div className="relative h-full w-full">
                            <img
                              src={
                                images[
                                  jobs.findIndex((j) => j.id === job.id)
                                ] || ""
                              }
                              alt={job.nome_vaga}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;

                                target.src =
                                  "https://via.placeholder.com/400x300?text=Imagem+indisponível";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                              <h3 className="text-lg font-semibold text-white mb-1">
                                {job.nome_vaga}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span className="tag bg-white/20 text-white">
                                  {job.localizacao}
                                </span>
                                <span className="tag bg-white/20 text-white">
                                  {job.tipo}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )
            )}
          </div>

          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
            onClick={() =>
              setCurrentCarouselIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentCarouselIndex === 0}
          >
            ←
          </button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
            onClick={() =>
              setCurrentCarouselIndex((prev) =>
                Math.min(Math.ceil(jobs.length / itemsToShow) - 1, prev + 1)
              )
            }
            disabled={
              currentCarouselIndex === Math.ceil(jobs.length / itemsToShow) - 1
            }
          >
            →
          </button>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-3">
            {Array.from({ length: Math.ceil(jobs.length / itemsToShow) }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    currentCarouselIndex === index
                      ? "bg-[#11833b]"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentCarouselIndex(index)}
                />
              )
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={selectedImage} className="rounded-lg mb-4" />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="text-sm text-gray-600 hover:text-[#11833b] transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const job = jobs[currentCarouselIndex];
                  handleApply(job);
                }}
                className="text-sm bg-[#11833b] text-white px-4 py-2 rounded-lg hover:bg-[#0f6a32] transition-colors"
              >
                Candidatar-se
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#007933] text-white py-4 text-center">
        <p>© 2025 Grupo Tapajós. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default JobList;
