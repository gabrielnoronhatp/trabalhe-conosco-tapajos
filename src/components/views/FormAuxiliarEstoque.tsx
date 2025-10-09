import { useState } from "react"
import InputQuestForm from "../Forms/InputQuestForm"

interface props {
    handleModal: any
    isSubmitting: boolean
    setAcertos: any
}

export default (({ handleModal, isSubmitting, setAcertos }: props) => {

    const [mark, setMark] = useState([])
    const [respostas, setRespostas] = useState(['C', 'B', 'C', 'E', 'E', 'B', 'A', 'B', 'B', 'C'])
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
            <h2 className="text-center">
                <strong>Responda as questões do formulário referente à vaga selecionada</strong>
            </h2>

            {/* QUESTÃO 1 */}
            <label><strong>1)</strong> A movimentação de materiais tem sido uma das causas mais frequentes e sérias de acidentes. Em razão disso, é muito importante a segurança durante esse tipo de trabalho. Diante do exposto, é correto afirmar que devem ser observadas algumas regras. Analise as afirmativas abaixo e marque a alternativa correta.</label>

            <label>I. Uso correto de equipamentos de proteção individual (EPI).</label>
            <label>II. Não elevar sozinho materiais com peso excessivo e não permanecer sob cargas que estão sendo movimentadas.</label>
            <label>III. Deslocar as operações de movimentação de produtos com rapidez a fim de agilizar.</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="A" id="q1a" name="q1" label_input="Apenas III." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="B" id="q1b" name="q1" label_input="Apenas II e III." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="C" id="q1c" name="q1" label_input="Apenas I e II." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="D" id="q1d" name="q1" label_input="Apenas I e III." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="E" id="q1e" name="q1" label_input="Todas as afirmativas estão corretas." />

            {/* QUESTÃO 2 */}
            <label><strong>2)</strong> O setor de recebimento e conferência de materiais faz parte das atividades do auxiliar de estoque. Com relação a este aspecto e a respeito das atividades relacionadas a este setor, analise as afirmativas abaixo e marque a alternativa correta.</label>

            <label>I. Realizar o pagamento da compra ao fornecedor mediante a entrega dos produtos.</label>
            <label>II. Checagem de possíveis avarias na embalagem externa e verificação de quantidades recebidas dos produtos.</label>
            <label>III. Executar a distribuição dos produtos e mercadorias fazendo as armazenagens nos devidos endereçamentos.</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="A" id="q2a" name="q2" label_input="Apenas a afirmativa I está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="B" id="q2b" name="q2" label_input="Apenas a afirmativa II está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="C" id="q2c" name="q2" label_input="Apenas a afirmativa III está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="D" id="q2d" name="q2" label_input="Apenas as afirmativas II e III estão corretas." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="E" id="q2e" name="q2" label_input="Todas as afirmativas estão corretas." />

            {/* QUESTÃO 3 */}
            <label><strong>3)</strong> Nesse sistema não existem locais fixos de armazenagem, a não ser para itens de estocagem especial. Os materiais vão ocupar os locais disponíveis dentro do estoque. Tal controle deverá ser feito por duas fichas, uma para o saldo por item e outra para o saldo por local. Trata-se do sistema de endereçamento:</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="A" id="q3a" name="q3" label_input="Via pallet." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="B" id="q3b" name="q3" label_input="Variável." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="C" id="q3c" name="q3" label_input="Fixo." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="D" id="q3d" name="q3" label_input="Direcionado." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="E" id="q3e" name="q3" label_input="Padronizado." />

            {/* QUESTÃO 4 */}
            <label><strong>4)</strong> Na movimentação de materiais no almoxarifado, alguns equipamentos poderão ser utilizados neste manuseio. Analise as afirmativas abaixo e marque a alternativa correta.</label>

            <label>I. Carrinhos que podem ser impulsionados manualmente.</label>
            <label>II. Empilhadeiras elétricas, a gasolina ou diesel.</label>
            <label>III. Pontes rolantes, de estrutura metálica sustentada por duas vigas ao longo das quais as pontes se movimentam; entre as vigas corre um carrinho com um gancho.</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="A" id="q4a" name="q4" label_input="Somente a afirmativa I está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="B" id="q4b" name="q4" label_input="Somente a afirmativa II está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="C" id="q4c" name="q4" label_input="Somente a afirmativa III está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="D" id="q4d" name="q4" label_input="As afirmativas I e II estão corretas." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="E" id="q4e" name="q4" label_input="Todas as afirmativas estão corretas." />

            {/* QUESTÃO 5 */}
            <label><strong>5)</strong> O armazenamento em depósitos tem dentre seus objetivos minimizar custos e maximizar o atendimento aos clientes. Para que estes objetivos sejam atingidos, as operações dos depósitos devem ser eficientes e desempenhar as tarefas abaixo:</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="A" id="q5a" name="q5" label_input="Oferecer um atendimento pontual aos clientes." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="B" id="q5b" name="q5" label_input="Manter um controle de itens, de modo que eles possam ser encontrados pronta e corretamente." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="C" id="q5c" name="q5" label_input="Fornecer elos de comunicação aos clientes." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="D" id="q5d" name="q5" label_input="Atualizar dados cadastrais dos fornecedores." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="E" id="q5e" name="q5" label_input="Todas as alternativas acima estão corretas." />

            {/* QUESTÃO 6 */}
            <label><strong>6)</strong> Com disciplina você conseguirá realizar todas as tarefas que se propôs fazer em muito menos tempo. Em relação à disciplina, analise as afirmativas abaixo e marque a alternativa correta.</label>

            <label>I. Disciplina é a capacidade que pode ser desenvolvida por qualquer ser humano através da prática de determinada ação de forma organizada e perseverante, a fim de obter um bem ou fim determinado.</label>
            <label>II. Seguir atentamente o que está escrito nos POP (procedimento operacional padrão) significa ser disciplinado.</label>
            <label>III. Obedecer atentamente seu superior imediato, seguindo a hierarquia é ter disciplina.</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="A" id="q6a" name="q6" label_input="Apenas I está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="B" id="q6b" name="q6" label_input="Apenas II está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="C" id="q6c" name="q6" label_input="Apenas III está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="D" id="q6d" name="q6" label_input="Apenas I e II estão corretas." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="E" id="q6e" name="q6" label_input="Todas as afirmativas estão corretas." />

            {/* QUESTÃO 7 */}
            <label><strong>7)</strong> Na logística, o armazenamento é constituído por um conjunto de funções de: recepção, descargas, carregamento, arrumação e conservação de matérias-primas e produtos acabados ou semiacabados. Tal descrição corresponde ao(à):</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="A" id="q7a" name="q7" label_input="Conservação." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="B" id="q7b" name="q7" label_input="Carga." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="C" id="q7c" name="q7" label_input="Recepção." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="D" id="q7d" name="q7" label_input="Carregamento." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="E" id="q7e" name="q7" label_input="Arrumação." />

            {/* QUESTÃO 8 */}
            <label><strong>8)</strong> Entende-se por segurança de armazenagem o conjunto de ações, normas e procedimentos que visam evitar furtos, roubos, quebras e avarias de equipamentos e materiais, bem como acidentes pessoais. Assinale, a seguir, a ação preventiva descrita incorretamente.</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="A" id="q8a" name="q8" label_input="Realizar inspeção minuciosa após ocorrência de algum evento prejudicial ao setor." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="B" id="q8b" name="q8" label_input="Proibir fumar durante o manuseio de caixas de papelão." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="C" id="q8c" name="q8" label_input="Providenciar a instalação de equipamentos contra incêndio, observando normas técnicas." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="D" id="q8d" name="q8" label_input="Evitar trânsito de veículos em velocidade que coloque em risco pessoas, materiais e instalações." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="E" id="q8e" name="q8" label_input="Utilizar cores, acessórios e símbolos de segurança em toda a área do almoxarifado." />

            {/* QUESTÃO 9 */}
            <label><strong>9)</strong> “Armazenagem e manuseio de ______________ são componentes essenciais do conjunto de atividades ______________. Os seus custos podem absorver de 12 a 40% das ______________ logísticas da firma”.</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="A" id="q9a" name="q9" label_input="Líquidos - administrativas - atividades." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="B" id="q9b" name="q9" label_input="Gases - gestoras - necessidades." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="C" id="q9c" name="q9" label_input="Cargas - manuais - questões." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="D" id="q9d" name="q9" label_input="Mercadorias - logísticas - despesas." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="E" id="q9e" name="q9" label_input="Nenhuma das alternativas acima." />

            {/* QUESTÃO 10 */}
            <label><strong>10)</strong> A organização do estoque é uma prática que visa gerenciar o volume adequado de produtos, para garantir o atendimento das demandas e o funcionamento do negócio. Analise as afirmativas abaixo e marque a alternativa correta.</label>

            <label>I. Existem vários meios de organizar o estoque, desde planilhas até softwares de gestão, sendo importante manter o histórico preservado.</label>
            <label>II. Organizar um estoque é um trabalho constante, desenvolvido juntamente com o negócio.</label>
            <label>III. Registrar tudo que entra no estoque é essencial para compreender o que sai e manter o controle de quantidades.</label>

            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="A" id="q10a" name="q10" label_input="Apenas a afirmativa I está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="B" id="q10b" name="q10" label_input="Apenas a afirmativa II está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="C" id="q10c" name="q10" label_input="Apenas a afirmativa III está correta." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="D" id="q10d" name="q10" label_input="Apenas II e III estão corretas." />
            <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="E" id="q10e" name="q10" label_input="Todas as afirmativas acima estão corretas." />

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
                        <>Enviar Candidatura</>
                    )}
                </button>
            </div>
        </div>
    )

})
