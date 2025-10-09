import { useState } from "react"
import InputQuestForm from "../Forms/InputQuestForm"

interface props {
    handleModal: any
    isSubmitting: boolean
    setAcertos: any
}


export default (({ handleModal, isSubmitting, setAcertos }: props) =>{

    const [mark, setMark] = useState([])
    const [respostas, setRespostas] = useState(['B', 'C', 'B', 'A', 'D', 'E', 'E', 'A', 'D', 'B'])
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
                <label><strong>1)</strong> Uma cliente sai do estabelecimento com as mãos carregadas de sacolas e está se direcionando para o seu carro que estacionou no pátio da loja, a atitude mais correta seria: Analise as afirmativas e assinale a alternativa correta:</label>
                <label htmlFor="">I.Oferecer ajuda, abrindo a porta da loja, agradecendo-lhe por ter escolhido nosso estabelecimento para suas compras.</label>
                <label htmlFor="">II.Não daria importância, pois já a recebeu na chegada com um belo sorriso e bom dia, depois que ela comprou não tem porque ficar ajudando.</label>
                <label htmlFor="">III.Não faria nada daria importância, pois já a recebeu na chegada com um belo sorriso e bom dia, depois que ela comprou não tem porque ficar ajudando.</label>
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="A" id="q1a" name="q1" label_input="Somente as afirmativas I e II são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="B" id="q1b" name="q1" label_input="Somente a afirmativa I está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="C" id="q1c" name="q1" label_input="Somente as afirmativas I e III são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="D" id="q1d" name="q1" label_input="Somente a afirmativa II está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 0)} value="E" id="q1e" name="q1" label_input="Todas as alternativas estão corretas." />
    
                {/* QUESTÃO 2 */}
                <label><strong>2)</strong> Dentre os vários fatores, que levam os motoristas a deixarem seus automóveis em estacionamentos privados está a insuficiência de vagas de estacionamento público nas ruas das cidades, os motoristas tendem optar por guardarem seus automóveis em estacionamentos privados e até utilizar os de estabelecimentos comerciais, tendo em vista que estes são gratuito. Analise as afirmativas e assinale a alternativa correta:</label>
                <label htmlFor="">I.Caso ocorra dano ou furto ao automóvel guardado no estabelecimento comercial, este deve responder pelos prejuízos causados ao seu cliente (consumidor), mesmo que o serviço seja disponibilizado gratuitamente e existam avisos no local divulgando a inexistência de responsabilidade.</label>
                <label htmlFor="">II.Caso ocorra dano ou furto ao automóvel guardado no estabelecimento comercial, este não responde pelos prejuízos causados ao seu cliente (consumidor), mesmo que não existam avisos no local divulgando a inexistência de responsabilidade.</label>
                <label htmlFor="">III.Os veículos nos estacionamentos comerciais, estão sob a responsabilidade daqueles que exploram comercialmente o negócio, que poderão arcar com os riscos de dano ao veículo, inclusive por furto de objetos do interior do automóvel, bem como do próprio veículo.</label>
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="A" id="q2a" name="q2" label_input="Somente as afirmativas I e II são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="B" id="q2b" name="q2" label_input="Somente a afirmativa I está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="C" id="q2c" name="q2" label_input="Somente as afirmativas I e III são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="D" id="q2d" name="q2" label_input="Somente a afirmativa II está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 1)} value="E" id="q2e" name="q2" label_input="Somente as afirmativas II e III são corretas." />
    
                {/* QUESTÃO 3 */}
                <label><strong>3)</strong> As vagas de estacionamento para idosos e portadores de necessidades especiais são regulamentadas pelo Conselho Nacional de Trânsito (CONTRAN). As placas e as credenciais padronizadas têm validade em todo o país. Analise as afirmativas e assinale a alternativa correta:</label>

                <label htmlFor="">I.Qualquer pessoa terá direito a usar a vaga especial, desde que esteja transportando um idoso ou pessoa com comprovada dificuldade de locomoção autorizados pelo órgão de trânsito.</label>
                <label htmlFor="">II.Somente a própria pessoa terá direito a usar a vaga especial, desde que esteja com comprovada dificuldade de locomoção autorizados pelo órgão de trânsito.</label>
                <label htmlFor="">III.Só tem direito a usar a vaga o idoso credenciado no Departamento de Trânsito (DETRAN) e que esteja ao volante.</label>

                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="A" id="q3a" name="q3" label_input="Somente as afirmativas I e II são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="B" id="q3b" name="q3" label_input="Somente a afirmativa I está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="C" id="q3c" name="q3" label_input="Somente as afirmativas I e III são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="D" id="q3d" name="q3" label_input="Somente a afirmativa II está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 2)} value="E" id="q3e" name="q3" label_input="Todas as alternativas estão corretas" />
    
                {/* QUESTÃO 4 */}
                <label><strong>4)</strong> Estatuto do Idoso (10.741/03) e a lei que promove a acessibilidade (10.098/00), que determinam a reserva do total de vagas existentes no estabelecimento tem a ser destinados para uso dos idosos e deficientes, que são:</label>
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="A" id="q4a" name="q4" label_input="5 % para idosos e 2% para deficientes." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="B" id="q4b" name="q4" label_input="2 % para idosos e 5% para deficientes.
" />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="C" id="q4c" name="q4" label_input="15 % para idosos e 10% para deficientes." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="D" id="q4d" name="q4" label_input="10 % para idosos e 5% para deficientes." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 3)} value="E" id="q4e" name="q4" label_input="Independentemente do número de vagas, basta 1 para idoso e 1 para deficiente." />
    
                {/* QUESTÃO 5 */}
                <label><strong>5)</strong> A legislação diz que cabe aos agentes de transito, averiguar questões de transito, ou seja, se o veículo não está estacionado de forma adequada, está em vaga especial (idosos / deficientes).  Sendo que o motorista estava sozinho. Não aparentava ter 60 anos ou mais como estipula a legislação. Ele desceu do carro e desapareceu entre os prédios. No painel do carro, havia uma autorização. Mas no documento constava o nome de uma mulher. Analise as afirmativas e assinale a alternativa correta:</label>

                <label htmlFor="">I.Isso não configura estacionamento irregular, pois ele era o motorista e estava a serviço de uma pessoa idosa a qual era a dona da autorização e lhe emprestou mesmo não estando junto.</label>
                <label htmlFor="">II.Isso e estacionamento irregular, se a fiscalização pegar, a autorização é recolhida, cancelada e o motorista multado.</label>
                <label htmlFor="">III.Isso não configura estacionamento irregular, não importa se é jovem ou saudável, basta ter a autorização da vaga especial no painel do carro mesmo que seja de outra pessoa que não esteja presente ali no carro.
</label>

                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="A" id="q5a" name="q5" label_input="Somente as afirmativas I e II são corretas."/>
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="B" id="q5b" name="q5" label_input="Somente a afirmativa I está correta."/>
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="C" id="q5c" name="q5" label_input="Somente as afirmativas I e III são corretas."/>
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="D" id="q5d" name="q5" label_input="Somente a afirmativa II está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 4)} value="E" id="q5e" name="q5" label_input="Todas as alternativas estão corretas"/>
    
                {/* QUESTÃO 6 */}
                <label><strong>6)</strong> Algumaspráticas facilitam a vida do cliente e tornam a experiência de compra mais confortável e agradável. Estabelecimentos que possuem estacionamento exclusivo para clientes são exemplo disso. Afinal, com a correria do dia a dia e com a quantidade de veículos nos grandes centros urbanos, na maioria das vezes não é tarefa fácil encontrar uma vaga para estacionar. E por isso, atualmente os estabelecimentos que proporcionam esse conforto e facilidade aos seus clientes são preferidos em relação aos que não o proporcionam. Analise as afirmativas e assinale a alternativa correta:</label>

                <label htmlFor="">I.Estabelecimentos com estacionamento próprio, servem de atrativo para a clientela.</label>
                <label htmlFor="">II.O estacionamento é um conforto para nossos clientes, pois eles já vêm até a loja sabendo que vão encontrar um local para deixar o veículo enquanto fazem as compras.</label>
                <label htmlFor="">III.Além da praticidade, os estacionamentos exclusivos proporcionam maior segurança aos clientes, que ficam despreocupados durante as compras por saberem que o veículo está protegido.
</label>

                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="A" id="q6a" name="q6" label_input="Somente as afirmativas I e II são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="B" id="q6b" name="q6" label_input="Somente a afirmativa I está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="C" id="q6c" name="q6" label_input="Somente as afirmativas I e III são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="D" id="q6d" name="q6" label_input="Somente a afirmativa II está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 5)} value="E" id="q6e" name="q6" label_input="Todas as alternativas estão corretas" />
    
                {/* QUESTÃO 7 */}
                <label><strong>7)</strong> Os clientes preferem comércios com estacionamento exclusivo, pois a tranquilidade de não ter que procurar um estacionamento, associada à segurança de saber que o veículo estará protegido de acidentes, agentes externos e pessoas de má índole, faz com que o cliente se sinta melhor no estabelecimento que proporciona esses benefícios. Analise as afirmativas e assinale a alternativa correta:</label>

                <label htmlFor="">I.Uma vez que o cliente está tranquilo e despreocupado em relação à segurança de seu veículo, a tendência é que passe mais tempo no estabelecimento comercial, e por isso a probabilidade de consumir mais ou de comprar mais produtos é grande.</label>
                <label htmlFor="">II.No caso de oferecer estacionamento exclusivo para clientes, as vantagens como maior conforto, comodidade, tranquilidade e segurança tornam a fidelização mais frequente e comum.</label>
                <label htmlFor="">III.Uma vez fidelizado o cliente, os gastos com ações de marketing e relacionamento com o cliente podem ser reduzidos, e é necessário apenas manter o bom relacionamento e a boa experiência no estabelecimento. </label>

                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="A" id="q7a" name="q7" label_input="Somente as afirmativas I e II são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="B" id="q7b" name="q7" label_input="Somente a afirmativa I está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="C" id="q7c" name="q7" label_input="Somente as afirmativas I e III são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="D" id="q7d" name="q7" label_input="Somente a afirmativa II está correta" />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 6)} value="E" id="q7e" name="q7" label_input="Todas as alternativas estão corretas" />
    
                {/* QUESTÃO 8 */}
                <label><strong>8)</strong> O Código de Defesa do Consumidor determina que a responsabilidade do estacionamento será objetiva. O art. 14 do referido Código responsabiliza, sem culpa, os prestadores de serviço. Assim, ao retornar ao estacionamento onde deixou seu carro, não o encontrar, não encontrar seus bens no interior do veículo ou encontrá-lo danificado com vidros quebrados, lataria amassada, pneus furados, etc., haverá o direito à reparação dos danos, sem que seja necessária, para tanto, a prova da culpa da empresa. Analise as afirmativas e assinale a alternativa correta:</label>

                <label htmlFor="">I.No caso de comércios, o fundamento da responsabilidade por fatos ocorridos em seus estacionamentos vem da colocação à disposição do cliente um serviço que, pela lógica, deve ser efetivo e eficiente, de modo que qualquer dano ali causado ao usuário deve ser reparado.</label>
                <label htmlFor="">II.Avisos como “não nos responsabilizamos pelo veículo ou pelos objetos deixados no veículo”, que configuram verdadeiras cláusulas de não-indenizar, não são admitidos como lícitos.</label>
                <label htmlFor="">III.A gratuidade do estacionamento eximi responsabilidades sobre os danos sofridos.</label>

                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="A" id="q8a" name="q8" label_input="Somente as afirmativas I e II são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="B" id="q8b" name="q8" label_input="Somente a afirmativa I está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="C" id="q8c" name="q8" label_input="Somente as afirmativas I e III são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="D" id="q8d" name="q8" label_input="Somente a afirmativa II está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 7)} value="E" id="q8e" name="q8" label_input="Todas as alternativas estão corretas" />
    
                {/* QUESTÃO 9 */}
                <label><strong>9)</strong> Certa pessoa estaciona o carro nas vagas para nossos clientes, ao descer do carro lhe diz vou deixar estacionado aqui um minuto, vou bem ali e já volto, você sabe que este senhor está acostumado a deixar o carro aqui e entrar na loja do concorrente. Qual a atitude correta?</label>

                <label htmlFor="">I.Hei cara você para seu carro no estacionamento do nosso estabelecimento que é para nossos clientes em compra e vai no concorrente aqui do lado! Pode tirar seu carro já!</label>
                <label htmlFor="">II.Cordialmente cumprimenta a pessoa e explica-lhe que o estacionamento é exclusivo para clientes em compra no nosso estabelecimento e que temos produtos de qualidade e com preço bem em conta devido aos descontos que oferecemos e além do mais temos uma variedade de outros produtos, perfumaria, higiene pessoal, conveniência...aproveite a oportunidade e entre conhecer nossa loja e nosso atendimento diferenciado!</label>
                <label htmlFor="">III.Bom dia! O senhor não pode estacionar aqui, pois o estacionamento é para nossos clientes somente, se não retirar seu carro corre o risco de ser guinchado, obrigada pela compreensão.
</label>

                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="A" id="q9a" name="q9" label_input="Somente as afirmativas I e II são corretas.
" />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="B" id="q9b" name="q9" label_input="Somente a afirmativa I está correta.
" />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="C" id="q9c" name="q9" label_input="Somente as afirmativas I e III são corretas.
" />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="D" id="q9d" name="q9" label_input="Somente a afirmativa II está correta.
" />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 8)} value="E" id="q9e" name="q9" label_input="Todas as alternativas estão corretas
" />
    
                {/* QUESTÃO 10 */}
                <label><strong>10)</strong>Em um certo estabelecimentos as vagas e estacionamento são muito disputadas em função do grande número de cliente, determinado cliente estaciona usando duas vagas.</label>

                <label htmlFor="">I.Estacionar um carro desta forma é infração média, de acordo com o Código de Trânsito Brasileiro (CTB), sujeito a multa e perda de pontos na carteira.</label>
                <label htmlFor="">II.Estacionar um carro desta forma não é considerado infração.</label>
                <label htmlFor="">III.Estacionar um carro desta forma é infração, porem o condutor não e multado, só recebera uma advertência.
</label>

                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="A" id="q10a" name="q10" label_input="Somente as afirmativas I e II são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="B" id="q10b" name="q10" label_input="Somente a afirmativa I está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="C" id="q10c" name="q10" label_input="Somente as afirmativas I e III são corretas." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="D" id="q10d" name="q10" label_input="Somente a afirmativa II está correta." />
                <InputQuestForm handleGetQ={(e: any) => handleGetQ(e, 9)} value="E" id="q10e" name="q10" label_input="Todas as alternativas estão corretas" />
    
    
    
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