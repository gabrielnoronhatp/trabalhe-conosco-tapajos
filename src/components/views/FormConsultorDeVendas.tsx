import { useState } from "react"
import InputQuestForm from "../Forms/InputQuestForm"

interface props {
    handleModal: any
    isSubmitting: boolean
    setAcertos: any
}

export default (({ handleModal, isSubmitting, setAcertos }: props) => {

    const [mark, setMark] = useState([])
    const [respostas, setRespostas] = useState(['D', 'C', 'B', 'C', 'C', 'A', 'C', 'A', 'B', 'A'])
    const [userAnswers, setUserAnswers] = useState<string[]>(Array(10).fill(""))

    function handleGetQ(e: any, index: number) {
        const newAnswers = [...userAnswers]
        newAnswers[index] = e.target.value
        setUserAnswers(newAnswers)
        console.log(userAnswers)
    }

    // Função que calcula os acertos
    function calcularAcertos() {
        let acertos = 0.0
        for (let i = 0; i < respostas.length; i++) {
            if (userAnswers[i] === respostas[i]) {
                acertos = acertos + 0.5
            }
            console.log(acertos)
        }
        return acertos
    }

    function handleSubmit(e: React.FormEvent) {
        //e.preventDefault();
        const acertos = calcularAcertos()
        setAcertos(acertos)
        console.log("Número de acertos:", acertos)
        handleModal(e)
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            <h2 className="text-center"> <strong>Responda as questões do formulário referente a vaga selecionada</strong></h2>

            {/* QUESTÃO 1 */}
            <label><strong>1)</strong> Em uma prescrição médica para tomar determinado medicamento 1 comprimido de 8 em 8 horas por 7 dias, de quantos comprimidos vou necessitar para completar o referido tratamento? (Tem de constar o cálculo).</label>
    
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="A" id="q1a" name="q1" label_input="7 comprimidos." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="B" id="q1b" name="q1" label_input="21 comprimidos." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="C" id="q1c" name="q1" label_input="16 comprimidos." />

            {/* QUESTÃO 2 */}
            <label><strong>2)</strong> Em uma prescrição médica para tomar determinado medicamento 7,5ml de 8 em 8 horas por 7 dias, de quantos ml vou necessitar para completar o referido tratamento? (Tem de constar o cálculo).</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="A" id="q2a" name="q2" label_input="52,5ml." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="B" id="q2b" name="q2" label_input="157,5ml." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="C" id="q2c" name="q2" label_input="123,5ml." />

            {/* QUESTÃO 3 */}
            <label><strong>3)</strong> O Código de Proteção do Consumidor (Lei n° 8.078/1990), em sua parte inicial, define alguns conceitos, dentre eles é correto afirmar que:</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="A" id="q3a" name="q3" label_input="Equipara-se a consumidor a coletividade de pessoas desde que determináveis, que haja intervindo nas relações de consumo." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="B" id="q3b" name="q3" label_input="Fornecedor é toda pessoa física ou jurídica, pública ou privada, nacional ou estrangeira, exceto os entes despersonalizados, que desenvolvem atividade de produção, montagem, criação, construção, transformação, importação, exportação, distribuição ou comercialização de produtos ou prestação de serviços." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="C" id="q3c" name="q3" label_input="Consumidor é toda pessoa física ou jurídica que adquire ou utiliza produto ou serviço como destinatário final." />

            {/* QUESTÃO 4 */}
            <label><strong>4)</strong> A principal vantagem das pomadas Oftalmica com relação às soluções Oftalmica (colírio) é:</label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="A" id="q4a" name="q4" label_input="Aumentar o tempo de contato do fármaco com os olhos." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="B" id="q4b" name="q4" label_input="Promover a dissolução do fármaco na mucosa conjuntiva." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="C" id="q4c" name="q4" label_input="Melhorar a estabilidade do fármaco." />

            {/* QUESTÃO 5 */}
            <label><strong>5)</strong>A qual grupo de medicamentos corresponde a afirmativa abaixo?
Medicamento elaborado a partir de derivados de Plantas medicinais tais como: suco, cera, extrato, óleo, tintura, entre outros.</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="A" id="q5a" name="q5" label_input="Medicamento fitoterápico." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="B" id="q5b" name="q5" label_input="Medicamento genérico." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="C" id="q5c" name="q5" label_input="Medicamento de referência." />

            {/* QUESTÃO 6 */}
            <label><strong>6)</strong> A cerca da atuação de medicamentos no organismo humano, antiinflamatórios são fármacos usados para:</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="A" id="q6a" name="q6" label_input="Escabiose." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="B" id="q6b" name="q6" label_input="Infecções causadas por microrganismos." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="C" id="q6c" name="q6" label_input="Inflamação." />

            {/* QUESTÃO 7 */}
            <label><strong>7)</strong> A cerca da atuação de medicamentos no organismo humano, antimicrobianos são fármacos usados para:</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="A" id="q7a" name="q7" label_input="Escabiose." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="B" id="q7b" name="q7" label_input="Infecções causadas por microrganismos." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="C" id="q7c" name="q7" label_input="Inflamação." />

            {/* QUESTÃO 8 */}
            <label><strong>8)</strong> A cerca da atuação de medicamentos no organismo humano, antipiréticos são fármacos usados para:</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="A" id="q8a" name="q8" label_input="Febre."/>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="B" id="q8b" name="q8" label_input="Escabiose."/>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="C" id="q8c" name="q8" label_input="Diarreia."/>

            {/* QUESTÃO 9 */}
            <label><strong>9)</strong> A cerca da atuação de medicamentos no organismo humano, antieméticos são fármacos usados para:
</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="A" id="q9a" name="q9" label_input="Dor de cabeça." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="B" id="q9b" name="q9" label_input="Alergia." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="C" id="q9c" name="q9" label_input="Vômito." />

            {/* QUESTÃO 10 */}
            <label><strong>10)</strong>A cerca da atuação de medicamentos no organismo humano, julgue o seguinte item. </label>

            <label htmlFor="">I.Medicamentos anti-histamínicos têm a função de reduzir ou eliminar os efeitos da histamina, que é um mediador químico secretado pelo corpo especialmente nos casos de reação alérgica.</label>


            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="A" id="q10a" name="q10" label_input="Certo" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="B" id="q10b" name="q10" label_input="Erradp" />



            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleSubmit}
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
                            Enviar Candidatura
                        </>

                    )}
                </button>
            </div>
        </div>
    )
})