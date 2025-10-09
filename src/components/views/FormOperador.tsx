import { useState } from "react"
import InputQuestForm from "../Forms/InputQuestForm"

interface props {
    handleModal: any
    isSubmitting: boolean
    setAcertos: any
}

export default (({ handleModal, isSubmitting, setAcertos }: props) => {

    const [mark, setMark] = useState([])
    const [respostas, setRespostas] = useState(['A', 'D', 'C', 'A', 'B', 'B', 'B', 'D', 'C', 'B'])
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
            <label><strong>1)</strong> A função de Operador de caixa é muito importante em uma empresa. O operador de caixa pode ser comparado ao engenheiro de uma obra ou ao professor de uma escola. Os operadores de caixa são pessoas-chave dentro de suas empresas porque: </label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="A" id="q1a" name="q1" label_input="Relacionam-se constantemente com os clientes e com o dinheiro da empresa." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="B" id="q1b" name="q1" label_input="Têm a preocupação em apenas vender bens e serviços." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="C" id="q1c" name="q1" label_input="Responsáveis pela movimentação financeira, dando ênfase ao pagamento de fornecedores." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="D" id="q1d" name="q1" label_input="Têm a facilidade para lidar apenas com os colegas de trabalho, organizados e, principalmente, serem de confiança." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="E" id="q1e" name="q1" label_input="São os profissionais sem a preocupação em atender bem ao cliente." />

            {/* QUESTÃO 2 */}
            <label><strong>2)</strong>Você é o Operador de Caixa da Drogaria x, foi solicitado para que dê expediente em outra filial para cobrir a ausência de um colega afastado por doença. Ao chegar ao local você encontrou o Sistema de Operação de Caixa sinalizando CAIXA ABERTO. O procedimento CORRETO para resolver tal ocorrência é:</label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="A" id="q2a" name="q2" label_input="Já que o caixa está aberto, sigo trabalhando normalmente." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="B" id="q2b" name="q2" label_input="Pedir a um colega operador ajudá-lo." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="C" id="q2c" name="q2" label_input="Por conta própria, fechar e proceder à nova rotina de abertura do caixa." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="D" id="q2d" name="q2" label_input="Solicitar a presença do supervisor de caixa para as providências de rotina." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="E" id="q2e" name="q2" label_input="Somente as alternativas a e d estão corretas." />

            {/* QUESTÃO 3 */}
            <label><strong>3)</strong> Ao receber o cliente em seu caixa, o operador fará o registro da venda de produtos ou pagamento de documentos. A informatização de tais processos exigiu das empresas a elaboração de um código digital para facilitar o registro dos produtos e documentos chamado tecnicamente de: </label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="A" id="q3a" name="q3" label_input="Código de verificação." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="B" id="q3b" name="q3" label_input="Código identificador." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="C" id="q3c" name="q3" label_input="Código de barras." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="D" id="q3d" name="q3" label_input="Código de registro." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="E" id="q3e" name="q3" label_input="Código direcional." />

            {/* QUESTÃO 4 */}
            <label><strong>4)</strong> O processo de saída de dinheiro do caixa, normalmente usados para composição de depósitos feitos pela empresa, no decorrer da movimentação diária e no término do expediente, quando o caixa é fechado, chama-se: </label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="A" id="q4a" name="q4" label_input="Sangria." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="B" id="q4b" name="q4" label_input="Estorno." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="C" id="q4c" name="q4" label_input="Transferência de valores." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="D" id="q4d" name="q4" label_input="Depósito identificado." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="E" id="q4e" name="q4" label_input="Fechamento provisório." />

            {/* QUESTÃO 5 */}
            <label><strong>5)</strong> O operador de caixa tem uma das funções mais importantes em uma empresa. Vejamos abaixo as atribuições do operador de caixa, EXCETO: </label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="A" id="q5a" name="q5" label_input="Abrir o caixa." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="B" id="q5b" name="q5" label_input="Fazer a manutenção dos equipamentos e do mobiliário (balcão, esteiras, lixeiras, etc.)." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="C" id="q5c" name="q5" label_input="Registrar o valor de todas as mercadorias ou serviços que são comercializados na empresa de forma correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="D" id="q5d" name="q5" label_input="Controlar e organizar o fluxo de dinheiro e documentos em seu caixa." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="E" id="q5e" name="q5" label_input="Ajudar o cliente a empacotar as compras durante o fechamento da venda, mesmo que tal função seja desenvolvida por outro colaborador." />

            {/* QUESTÃO 6 */}
            <label><strong>6)</strong> Quando falamos de serviço de qualidade, estamos nos referindo, primeiramente, à plena satisfação do cliente. O segredo para atingir tal objetivo reside na empresa que se concentra:</label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="A" id="q6a" name="q6" label_input="Apenas nas novas tecnologias, pois elas sozinhas podem significar a excelência na prestação de um serviço de qualidade." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="B" id="q6b" name="q6" label_input="Nas necessidades e nos desejos do cliente, criando um serviço que atenda ou exceda suas expectativas." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="C" id="q6c" name="q6" label_input="Nas necessidades básicas do cliente, oferecendo-lhe somente algumas informações para o cumprimento de suas obrigações." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="D" id="q6d" name="q6" label_input="Nenhuma alternativa acima está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="E" id="q6e" name="q6" label_input="Todas as alternativas estão corretas." />

            {/* QUESTÃO 7 */}
            <label><strong>7)</strong>Ao final do expediente o Supervisor Caixa efetuou o fechamento do seu caixa. O resultado foi: Venda em Espécie = R$ 512,55, Cartão de Crédito = R$ 400,02, Duplicatas = R$ 213,55 e Cartão Visa Débito em Conta = R$ 723,80. Baseado nesse resultado, o valor da venda à vista será de:</label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="A" id="q7a" name="q7" label_input="R$ 512,55" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="B" id="q7b" name="q7" label_input="R$ 1.236,35" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="C" id="q7c" name="q7" label_input="R$ 1.449,90" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="D" id="q7d" name="q7" label_input="R$ 723,80" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="E" id="q7e" name="q7" label_input="R$ 937,35" />

            {/* QUESTÃO 8 */}
            <label><strong>8)</strong>Em um porto, agentes de navegação pagam uma taxa de utilização da infraestrutura marítima de R$ 17,00 por contêiner, tanto na importação quanto na exportação. O valor, em reais, pago por um agente de navegação para embarcar 80 contêineres é de: </label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="A" id="q8a" name="q8" label_input="R$ 1.360,00" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="B" id="q8b" name="q8" label_input="R$ 867,50" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="C" id="q8c" name="q8" label_input="R$ 2.145,00" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="D" id="q8d" name="q8" label_input="R$ 5.552,00" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="E" id="q8e" name="q8" label_input="R$ 8.675,00" />

            {/* QUESTÃO 9 */}
            <label><strong>9)</strong>Dona Maria foi ao banco pagar as contas de luz e de telefone. Pagou as duas contas com uma nota de 100 reais e recebeu R$ 32,50 de troco. Se o valor da conta de luz era R$ 35,80, qual era, em reais, o valor da conta de telefone? </label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="A" id="q9a" name="q9" label_input="R$ 26,50" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="B" id="q9b" name="q9" label_input="R$ 28,60" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="C" id="q9c" name="q9" label_input="R$ 31,70" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="D" id="q9d" name="q9" label_input="R$ 35,80" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="E" id="q9e" name="q9" label_input="R$ 43,30" />

            {/* QUESTÃO 10 */}
            <label><strong>10)</strong>Em uma loja de eletrodomésticos, um televisor que custava R$ 450,00 estava sendo vendido com 20% de desconto em uma promoção. Como as vendas não aumentaram, o gerente da loja resolveu oferecer 10% de abatimento sobre o preço da promoção. Qual passou a ser, após o segundo desconto, o preço desse televisor?</label>
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="A" id="q10a" name="q10" label_input="R$ 315,00" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="B" id="q10b" name="q10" label_input="R$ 324,00" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="C" id="q10c" name="q10" label_input="R$ 350,00" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="D" id="q10d" name="q10" label_input="R$ 372,00" />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="E" id="q10e" name="q10" label_input="R$ 420,00" />



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