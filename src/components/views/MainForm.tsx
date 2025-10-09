import { Clock, FileText, Image, UploadIcon } from "lucide-react"
import InputForm from "../Forms/InputForm"
import InputFormFile from "../Forms/InputFormFile"
import LinkDownloadForm from "../Forms/LinkDownloadForm"

interface props {
    formErrors: any
    formData: any
    //HTML INPUT
    fileInputRef: any
    photoPreview: any

    //Handles
    handlePhotoChange: any
    handleInputChange: any
    handleRadioChange: any
    handleCvChange: any
    handleTermoFile: any
    handleModal: any
    handleVideoChange: any
    handleFormDisc: any

    indexPage?: number
    handlePageForm: any
    isNextPage: boolean

    jobVideo: any
    jobDisc: any

    referecne_check: boolean
    isSubmitting: boolean

    positionFromURL: any

}

export default (({ formErrors, formData, fileInputRef, photoPreview, handlePhotoChange, handleInputChange, handleRadioChange, handleCvChange, handleTermoFile, handleModal, handleVideoChange, jobVideo, jobDisc, referecne_check, isSubmitting, positionFromURL, isNextPage, handlePageForm, handleFormDisc, indexPage }: props) => {

    const regex = /\b(interna|interno)\b/i

    return (
        <>

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


                <InputForm id="fullName" type_input="text" handleInputChange={handleInputChange} formData={formData.fullName} label_input="Nome Completo" formErrors={formErrors.fullName} />

                <InputForm id="position" type_input="text" handleInputChange={handleInputChange} formData={formData.position} label_input="Cargo Desejado" formErrors={formErrors.jobId} required_input={false} />

                {/*NOVAS ALTERAÇÕES*/}

                {regex.test(positionFromURL ?? '') ? (
                    <>

                        <InputForm id="cargo_atual" formData={formData.cargo_atual} handleInputChange={handleInputChange} label_input="Cargo atual na empresa" formErrors={formErrors.cargo_atual} type_input="text" />

                        <InputForm id="matricula" formData={formData.matricula} handleInputChange={handleInputChange} label_input="Matricula" formErrors={formErrors.matricula} type_input="text" />

                        <InputForm id="data_admissao" label_input="Data de Admissão" formData={formData.data_admissao} handleInputChange={handleInputChange} formErrors={formErrors.data_admissao} type_input="date" />

                        <InputForm id="loja_setor" formData={formData.loja_setor} handleInputChange={handleInputChange} label_input="Setor ou Loja atuante" formErrors={formErrors.loja_setor} />
                    </>
                ) : (
                    <>
                        <label className="block text-sm font-medium text-[#11833b] mb-1" htmlFor="">Conhece alguém que já trabalhe concosco?</label>
                        <div className="flex space-x-5">
                            <div className="">
                                <input type="radio" name="reference" id="reference" value="Sim" className="mr-1" onChange={handleRadioChange} />
                                <label htmlFor="reference">Sim</label>
                            </div>
                            <div>
                                <input type="radio" name="reference" id="reference" value="Não" className="mr-1" onChange={handleRadioChange} />
                                <label htmlFor="reference">Não</label>
                            </div>
                        </div>

                        {referecne_check && (
                            <>
                                <InputForm id="name_reference" label_input="Nome Completo do colaborador referência" formData={formData.name_reference} handleInputChange={handleInputChange} formErrors={formErrors.name_reference} />

                                <InputForm id="loja_setor_reference" formData={formData.loja_setor_reference} handleInputChange={handleInputChange} label_input="Setor ou Loja atuante da referência" formErrors={formErrors.loja_setor_reference} />
                            </>
                        )}
                    </>
                )}

                <InputForm id="address" type_input="text" formData={formData.address} formErrors={formErrors.address} handleInputChange={handleInputChange} label_input="Endereço Completo" />

                <InputForm id="cep" label_input="CEP" handleInputChange={handleInputChange} formData={formData.cep} formErrors={formErrors.cep} mask="99999-999" />

                <InputForm id="bairro" formData={formData.bairro} handleInputChange={handleInputChange} label_input="Bairro" formErrors={formErrors.bairro} type_input="text" />

                <InputForm id="cidade" type_input="text" handleInputChange={handleInputChange} formData={formData.cidade} label_input="Cidade" formErrors={formErrors.cidade} />

                <InputForm id="estdao" type_input="text" label_input="Estado" formData={formData.estado} handleInputChange={handleInputChange} formErrors={formErrors.estado} />

                <InputForm id="numero" label_input="Número" formData={formData.numero} handleInputChange={handleInputChange} type_input="text" />

                <InputForm id="complemento" type_input="text" formData={formData.complemento} handleInputChange={handleInputChange} label_input="Complemento" />

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

                    <InputForm id="cpf" label_input="CPF" formData={formData.cpf} handleInputChange={handleInputChange} formErrors={formErrors.cpf} mask="999.999.999-99" />

                    <InputForm formData={formData.rg} id="rg" handleInputChange={handleInputChange} label_input="RG" type_input="text" />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InputForm formData={formData.email} formErrors={formErrors.email} handleInputChange={handleInputChange} id="email" type_input="email" label_input="E-mail" />

                    <InputForm formData={formData.phone} formErrors={formErrors.phone} handleInputChange={handleInputChange} id="phone" type_input="tel" label_input="Telefone" />

                </div>

                <InputFormFile id="cv" formData={formData.cv} formErrors={formErrors.cv} handleFileChange={handleCvChange} label_input={"Anexar Currículo"} />

            </div>

            {regex.test(positionFromURL ?? '') && (
                <>
                    <div className="mt-2">
                        <label htmlFor="form_file"
                            className="block text-sm font-medium text-[#11833b] mb-1">Anexar documento interno preenchido <FileText className="inline-block w-4 h-4" /></label>
                        <input id="form_file"
                            type="file"
                            accept=".pdf,.doc,.docx,.xls"
                            onChange={handleTermoFile}
                            className={`w-full p-2 border ${formErrors.form_file ? "border-red-500" : "border-gray-300"
                                } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
                            required
                        />
                        {formErrors.form_file && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.form_file}</p>
                        )}
                        {formData.form_file && (
                            <p className="text-green-600 text-xs mt-1">
                                Arquivo selecionado: {formData.form_file.name}
                            </p>
                        )}
                    </div>
                    <div className="mt-1 text-sm mb-4">
                        <label htmlFor="">Baixe o arquivo para preenchimento de candidato interno clicando no link em azul:</label>
                        <LinkDownloadForm label_link={'clique aqui para baixar documentação'} srcDownload={'./assets/SELEÇÃO INTERNA.pdf'} />
                    </div>
                </>
            )}


            {jobVideo == 'true' && (
                <div className="mt-2">
                    <p className="block text-sm font-medium text-[#11833b] mb-1" >Etapa: Vídeo de Apresentação</p>
                    <p><strong>Duração máxima: até 2 minutos</strong></p>
                    <ul>
                        <li className="">- O candidato deverá gravar um vídeo curto se apresentando, falando sobre sua experiência e habilidades.</li>
                    </ul>
                    <InputFormFile id="video_apresentation" label_input="Enviar vídeo de apresentação" formData={formData.video_apresentation} handleFileChange={handleVideoChange} formErrors={formErrors.video_apresentation} />
                </div>
            )}

            {jobDisc == 'true' && (
                <div className="mt-5">
                    <p className="block text-sm font-medium text-[#11833b] mb-1" >É um prazer ter você em nosso processo seletivo!</p>
                    <p>Para darmos continuidade de forma mais ágil, pedimos que você responda ao nosso Teste de Perfil Comportamental – DISC no link abaixo.</p>
                    <p className="block text-sm font-medium text-[#11833b] mb-1">Orientações:</p>
                    <ul>
                        <li>• Marque as opções com as quais mais se identifica</li>
                        <li>• Ao finalizar, envie o resultado para o seu e-mail;</li>
                        <li>• Um arquivo em PDF será gerado automaticamente;</li>
                        <li>• Por gentileza, envie esse PDF por esta mesma via (WhatsApp).</li>
                        <li>•<a href=""> 92 99999-9999</a></li>
                        <li>Aguardamos seu retorno! 😊</li>
                    </ul>

                    <a className="text-blue-700 underline font-bold" target="_blank" href="https://www.mrcoach.com.br/teste-perfil-comportamental-disc.php">link para acessar formulário do DISC</a>

                    <InputFormFile id="form_disc" formData={formData.form_disc} formErrors={formErrors.form_disc} handleFileChange={handleFormDisc} label_input={"Anexar Currículo"} />

                </div>
            )}

            <div className="mt-8 flex justify-center">
                {isNextPage ? (
                    <>

                        <button
                            onClick={handleModal}
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
                                <>
                                    {isNextPage ? (
                                        <>
                                            Enviar Candidatura
                                        </>
                                    ) : (
                                        <>
                                            Próxima etapa
                                        </>
                                    )}
                                </>

                            )}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={(e) => handlePageForm(1, e)}
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
                                <>
                                    {isNextPage ? (
                                        <>
                                            Enviar Candidatura
                                        </>
                                    ) : (
                                        <>
                                            Próxima etapa
                                        </>
                                    )}
                                </>

                            )}
                        </button>
                    </>
                )}

            </div>
        </>
    )
})