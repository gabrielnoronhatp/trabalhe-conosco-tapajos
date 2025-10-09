import { useState } from "react"
import InputQuestForm from "../Forms/InputQuestForm"

interface props {
    handleModal: any
    isSubmitting: boolean
    setAcertos: any
}

export default (({ handleModal, isSubmitting, setAcertos }: props) => {

    const [mark, setMark] = useState([])
    const [respostas, setRespostas] = useState(['A', 'A', 'D', 'A', 'E', 'D', 'E', 'B', 'A', 'D'])
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
            <label><strong>1)</strong> Farmácia Clínica é uma área da farmácia voltada à ciência e prática do uso racional de medicamentos, na qual os farmacêuticos prestam cuidado ao paciente, de forma a otimizar a farmacoterapia, promover saúde e bem-estar e prevenir doenças.
São atribuições Clinicas do Farmacêutico:
</label>
            <label htmlFor="">I. Fazer a anamnese farmacêutica, bem como verificar sinais e sintomas, com o propósito de prover cuidados ao paciente.</label>
            <label htmlFor="">II. Elaborara o plano de cuidado farmacêutico do paciente.</label>
            <label htmlFor="">III. Solicitar exames laboratoriais, no âmbito de sua competência profissional, com a finalidade de monitorar os resultados da farmacoterapia.</label>
            <label htmlFor="">IV. Realizar, no âmbito de sua competência profissional, administração de medicamentos ao paciente.
</label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="A" id="q1a" name="q1" label_input="Todas as alternativas" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="B" id="q1b" name="q1" label_input="Somente as alternativas II e IV." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="C" id="q1c" name="q1" label_input="As alternativas I, II e IV." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="D" id="q1d" name="q1" label_input="Somente as alternativas I e II." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="E" id="q1e" name="q1" label_input="Somente as alternativas e IV." />

            {/* QUESTÃO 2 */}
            <label><strong>2)</strong> De acordo com a Lei nº 1.454/2017, ficam autorizados a produção, comercialização e consumo, sob prescrição médica, dos anorexígenos contendo:
</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="A" id="q2a" name="q2" label_input="Sibutramina, Anfepramona, Femproporex e mazindol, mediante notificação de receita do tipo B2." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="B" id="q2b" name="q2" label_input="Aminorex, Fentermina, Mazindol e Sibutramina, mediante notificação B1." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="C" id="q2c" name="q2" label_input="Sibutramina, Anfepramona, Mirtazapina e Femproporex, mediante notificação de receita do tipo B2." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="D" id="q2d" name="q2" label_input="Aminorex, Fentermina, Mazindol e Sibutramina, mediante notificação B2." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="E" id="q2e" name="q2" label_input="Sibutramina, Anfepramona, Femproporex e mazindol, mediante notificação de receita do tipo C2." />

            {/* QUESTÃO 3 */}
            <label><strong>3)</strong> O Captopril, droga muito usada na hipertensão, e um vasodilatador que age:</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="A" id="q3a" name="q3" label_input="Bloqueando a captura de norepinefrina." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="B" id="q3b" name="q3" label_input="Bloqueando a liberação de norepinefrina." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="C" id="q3c" name="q3" label_input="Liberando ácido nítrico." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="D" id="q3d" name="q3" label_input="Inibindo a enzima conversora de angiotensina." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="E" id="q3e" name="q3" label_input="Liberando endotelina." />

            {/* QUESTÃO 4 */}
            <label><strong>4)</strong> Metabolismo de primeira passagem (também conhecido como metabolismo pré-sistêmico ou efeito de primeira passagem) é um fenômeno do metabolismo dos fármacos no qual a concentração do fármaco é significantemente reduzida (e inativada) pelo fígado antes de atingir a circulação sistêmica.
O efeito de primeira passagem de um fármaco acarreta:</label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="A" id="q4a" name="q4" label_input="Redução considerável da biodisponibilidade." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="B" id="q4b" name="q4" label_input="Aumento no volume de distribuição." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="C" id="q4c" name="q4" label_input="Aumenta a biodisponibilidade." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="D" id="q4d" name="q4" label_input="Declínio na taxa de eliminação renal." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="E" id="q4e" name="q4" label_input="Alteração na velocidade de administração." />

            {/* QUESTÃO 5 */}
            <label><strong>5)</strong>Um médico receitou a um paciente, 5ml de certo medicamento a cada 8 horas. O fármaco prescrito possui concentração padrão de 250mg/5ml. Ao verificar o estoque o profissional responsável se deu conta que não tinha tal concentração, porem possui o mesmo fármaco na concentração de 400mg/5ml. Se fosse para ajustar a doe qual seria a quantidade a ser administrada na concentração presente em seu estoque.:
</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="A" id="q5a" name="q5" label_input="5ml." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="B" id="q5b" name="q5" label_input="2,5ml." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="C" id="q5c" name="q5" label_input="10ml." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="D" id="q5d" name="q5" label_input="4ml." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="E" id="q5e" name="q5" label_input="3.125ml." />

            {/* QUESTÃO 6 */}
            <label><strong>6)</strong> Boas práticas farmacêuticas é o conjunto de técnicas e medidas que visam assegurar a manutenção da qualidade e segurança dos produtos disponibilizados e dos serviços prestados em farmácias e drogarias, com o fim de contribuir para o uso racional desses produtos e a melhoria da qualidade de vida dos usuários.
Um dos serviços farmacêuticos garantidos como boa pratica de farmácia e drogarias na RDC 44/2009 da ANVISA é:
</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="A" id="q6a" name="q6" label_input="Atendimento por meio telemático (telefone, mensagem de texto, etc.)." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="B" id="q6b" name="q6" label_input="Atendimento em domicílio." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="C" id="q6c" name="q6" label_input="Dosagem de glicose, colesterol e hemoglobina por meios rápidos de triagem." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="D" id="q6d" name="q6" label_input="Intervenção em prescrições médicas." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="E" id="q6e" name="q6" label_input="Curativos e pequenas suturas." />

            {/* QUESTÃO 7 */}
            <label><strong>7)</strong> A dislipidemia é uma doença que se caracteriza por anomalias nos níveis de lipídeos no sangue, principalmente do colesterol total e dos triglicerídeos. Outras alterações incluem colesterol de lipoproteína de alta densidade baixo (HDL-C) e níveis elevados de colesterol de lipoproteína de baixa densidade (LDL-C).
As estatinas são fármacos usados no tratamento das dislipidemias. Qual fármaco e um exemplo de estatina?
</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="A" id="q7a" name="q7" label_input="Insulina de Glargina." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="B" id="q7b" name="q7" label_input="Histamina." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="C" id="q7c" name="q7" label_input="Ômega 6." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="D" id="q7d" name="q7" label_input="Ômega 3." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="E" id="q7e" name="q7" label_input="Sinvastatina." />

            {/* QUESTÃO 8 */}
            <label><strong>8)</strong> A Organização Mundial de Saúde (OMS) define reação adversa a medicamento (RAM) como “qualquer resposta prejudicial ou indesejável e não intencional que ocorre com medicamentos em doses normalmente utilizadas no homem para profilaxia, diagnóstico, tratamento de doença ou para modificação de funções fisiológicas”.
A resposta adversa que aparece raramente com o uso do diclofenaco é:
</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="A" id="q8a" name="q8" label_input="Efeito sobre o SNC."/>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="B" id="q8b" name="q8" label_input="Comprometimento da função renal."/>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="C" id="q8c" name="q8" label_input="Exantemas cutâneos."/>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="D" id="q8d" name="q8" label_input="Retenção hídrica e edemas."/>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="E" id="q8e" name="q8" label_input="Perfuração da parede intestinal."/>

            {/* QUESTÃO 9 */}
            <label><strong>9)</strong> O cloridrato de propranolol é um betabloqueador. Considere as seguintes afirmativas sobre o propranolol.</label>

            <label htmlFor="">I. É indicado no controle de hipertensão.</label>
            <label htmlFor="">II.É indicado no controle das arritmias cardíacas.</label>
            <label htmlFor="">III. É indicado na profilaxia da enxaqueca.</label>
            <br />
            <label htmlFor="">De acordo com as características farmacológicas do propranolol, é correto o que se afirma em:</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="A" id="q9a" name="q9" label_input="Todas as afirmativas.
        " />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="B" id="q9b" name="q9" label_input="Somente I e III.
        " />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="C" id="q9c" name="q9" label_input="Somente I.
        " />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="D" id="q9d" name="q9" label_input="Somente II e III.
        " />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="E" id="q9e" name="q9" label_input="Somente I e II.
        " />

            {/* QUESTÃO 10 */}
            <label><strong>10)</strong>A serotonina ésubstância amina (C10H12N2O) encontrada em tecidos humanos e animais, especialmente no cérebro e nas mucosas gástricas, que desempenha importante função fisiológica como neurotransmissor, vasoconstritor e regulador da atividade dos músculos lisos; hidroxitriptamina.
Considerando-se os fármacos inibidores da recaptação de serotonina, numerar a 2ª coluna de acordo com a 1ª e, após, assinalar a alternativa que apresenta a sequência CORRETA:</label>

            <label htmlFor="">1)Fluoxetina.</label>
            <label htmlFor="">2)Paroxítona.</label>
            <label htmlFor="">3)Citalopram.

            <br />

            <label htmlFor="">(   ) Não é opticamente ativa.</label>
            <label htmlFor="">(   ) É o enantiômero S do Citalopram.</label>
            <label htmlFor="">(   ) Existe como isômero e é formulado na forma racêmica.</label>

            </label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="A" id="q10a" name="q10" label_input="2 – 3 – 1." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="B" id="q10b" name="q10" label_input="3 – 2 –1." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="C" id="q10c" name="q10" label_input="1 – 2 – 3." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="D" id="q10d" name="q10" label_input="1 – 3 – 2." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="E" id="q10e" name="q10" label_input="3 – 1 – 2." />



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