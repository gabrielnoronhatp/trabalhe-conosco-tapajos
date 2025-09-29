import { useState, useEffect } from 'react'
import './style.css'
import { toast } from 'react-toastify'

interface props {
    handleModal: any
    handleSubmit: any
    setTermo: any
    setFormData:any
    data:any
}
export default ((prop: props) => {
    const [formData, setFormData] = useState({
        termo1: false,
        termo2: false,
        termo3: false
    })

    const [termo, setTermo] = useState(false)

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useEffect(() =>{
        console.log("AAAA")
        if(formData.termo1 && formData.termo2 && formData.termo3){
            prop.setFormData((prev:any) => ({
            ...prev, termo:true
        }))
            prop.setTermo(true)
        }   
    },[formData])

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
            "termo1",
            "termo2",
            'termo3'
        ];

        // Validar campos obrigatórios
        for (const field of requiredFields) {
            if (!formData[field]) {
                errors[field] = `Campo obrigatório`;
            }
        }

        //Validar termo
        if (!formData.termo1) {
            errors.termo1 = "E necessário concordar com o termo!"
        }
        if (!formData.termo2) {
            errors.termo2 = "E necessário concordar com o termo!"
        }
        if (!formData.termo3) {
            errors.termo3 = "E necessário concordar com o termo!"
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;

    };

    function handleSubmit() {
        if (!validateForm()) {
            toast.error("Por favor, concorde com todos os termos");
            return;
        }

        prop.setTermo(true)

        prop.setFormData((prev:any) => ({
            ...prev, termo:true
        }))
        
        prop.handleSubmit();
    }


    return (
        <>
            <div className="h-full w-full bg-black fixed z-10 bg-opacity-55">
                <div className="flex justify-center items-center border-2 w-full h-full">
                    <div className="text-black bg-white flex p-10 w-1/2 flex-col h-5/6">
                        <h2 className="text-lg" style={{ fontWeight: 'bold' }}>TERMO DE CONSENTIMENTO PARA TRATAMENTO DE DADOS PESSOAIS</h2>
                        <br />
                        <div></div>
                        <div className="border-4 overflow-auto p-1 mb-5 full" >
                            <p className="text-lg">
                                Ao enviar seu currículo por meio desta plataforma, você declara estar ciente e de acordo com as disposições da Lei Geral de Proteção de Dados Pessoais – LGPD (Lei nº 13.709/2018), autorizando o Grupo Tapajós a realizar o tratamento de seus dados pessoais para fins exclusivos de processos seletivos e recrutamento.

                                <br />
                                <br />
                                <p style={{ fontWeight: 'bold' }}>1. Finalidade do tratamento dos dados </p>
                                <p>Os dados pessoais e informações profissionais fornecidos serão utilizados exclusivamente para:</p>
                                <p>- Analisar seu perfil profissional;</p>
                                <p>- Entrar em contato para agendamento de entrevistas ou envio de informações relacionadas à vaga;</p>
                                <p>- Manter registro para futuros processos seletivos, caso autorizado.</p>
                                <br />
                                <p style={{ fontWeight: 'bold' }}>2. Compartilhamento de dados</p>
                                <p>Os dados poderão ser compartilhados internamente com gestores e equipes responsáveis pelos processos de recrutamento, preservando sempre sua privacidade e segurança.</p>
                                <br />
                                <p style={{ fontWeight: 'bold' }}>3. Prazo de retenção </p>
                                <p>Seus dados poderão permanecer armazenados pelo período máximo de 3 meses, sendo excluídos de forma segura após esse prazo, salvo em caso de exigência legal.</p>
                                <br />
                                <p style={{ fontWeight: 'bold' }}>4. Direitos do titular dos dados </p>
                                <p>Nos termos da LGPD, você poderá, a qualquer momento, solicitar: </p>
                                <p>- Confirmação da existência de tratamento dos seus dados; </p>
                                <p>- Acesso, correção ou exclusão dos seus dados;</p>
                                <br />
                                <p style={{ fontWeight: 'bold' }}>5. Direitos do titular</p>
                                <p>Você poderá, a qualquer momento, solicitar confirmação, acesso, correção ou exclusão dos seus dados, bem como revogar este consentimento, entrando em contato pelo e-mail do DPO:
                                    <a href="mailto:yann.ferreira@grupotajos.com.br">yann.ferreira@grupotajos.com.br</a>(RESPONSAVEL PELO JURÍDICO)</p>
                            </p>

                            <br />

                            <div className="container_checkbox">
                                <p style={{ fontWeight: 'bold' }}>ACEITE DOS TERMOS</p>
                                <div className="container_checkbox_inputs">
                                    <input id='termo1' name='termo1' type="checkbox" className="w-4 h-4 text-[#11833b] border-gray-300 rounded focus:ring-[#11833b]" onChange={handleInputChange} checked={formData.termo1} />
                                    <p>Autorizo o tratamento dos meus dados pessoais para o processo seletivo da vaga pretendida.</p>
                                </div>
                                {formErrors.termo1 && (
                                    <p className="text-red-500 text-lg mt-1">{formErrors.termo1}</p>
                                )}
                                <div className="container_checkbox_inputs">
                                    <input id='termo2' name='termo2' type="checkbox" className="w-4 h-4 text-[#11833b] border-gray-300 rounded focus:ring-[#11833b]" onChange={handleInputChange} checked={formData.termo2} />
                                    <p>Autorizo a manutenção dos meus dados para participação em futuros processos seletivos, pelo prazo de até 3 meses.</p>
                                </div>
                                {formErrors.termo2 && (
                                    <p className="text-red-500 text-lg mt-1">{formErrors.termo2}</p>
                                )}
                                {/*<div className="container_checkbox_inputs">
                                <input type="checkbox" className="w-4 h-4 text-[#11833b] border-gray-300 rounded focus:ring-[#11833b]" />
                                <p style={{color:"red"}}>Não autorizo o tratamento dos meus dados pessoais.</p>
                            </div>*/}
                                <p style={{ fontWeight: 'bold' }}>Declaro que li, entendi e concordo com as condições acima.</p>

                                <div className="container_checkbox_inputs">
                                    <input id='termo3' name='termo3' type="checkbox" className="w-4 h-4 text-[#11833b] border-gray-300 rounded focus:ring-[#11833b]" onChange={handleInputChange} checked={formData.termo3} />
                                    <p>Sim, autorizo o tratamento dos meus dados pessoais para as finalidades descritas neste termo.</p>
                                </div>
                                {formErrors.termo3 && (
                                    <p className="text-red-500 text-lg mt-1">{formErrors.termo3}</p>
                                )}
                                {/*<div className="container_checkbox_inputs">
                                <input type="checkbox" className="w-4 h-4 text-[#11833b] border-gray-300 rounded focus:ring-[#11833b]"/>
                                <p style={{color:"red"}}>Não autorizo.</p>
                            </div>*/}
                            </div>
                        </div>



                        <button type="button" onClick={handleSubmit} className=" bg-gray-600 min-w-1.5- p-3 text-white rounded-lg h-20 w-52 text-lg" style={{ margin: '0 auto' }}>Enviar candidatura</button>

                        <p onClick={prop.handleModal} className='text-gray-600 underline' style={{ margin: '0 auto', cursor: 'pointer' }}>Fechar</p>
                    </div>
                </div>
            </div>
        </>
    )
})