import { useCallback, useEffect, useState, useRef } from "react"
import Transacao from "../../logic/core/financas/Transacao"
import ServicosFinancas from "../../logic/core/financas/ServicosFinancas"
import useCentralDeAcesso from "./useCentralDeAcesso"
import servicos from "@/logic/core"
import router from "next/router"


export default function useTransacoes() {
    const { usuario } = useCentralDeAcesso()
    
    const financasRef = useRef(new ServicosFinancas())
    
    const [data, setData] = useState<Date>(new Date())
    const [transacoes, setTransacoes] = useState<Transacao[]>([])
    const [transacao, setTransacao] = useState<Transacao | null>(null)

    // Função para carregar transações ao iniciar ou mudar a data
    const carregarTransacoes = useCallback(async () => {
        if (!usuario) return
        try {
            const transacoesCarregadas = await servicos.financas.consultarPorMes(usuario, data)
            setTransacoes(transacoesCarregadas)
        } catch (error) {
            console.error("Erro ao carregar transações:", error)
        }
    }, [usuario, data])

    // Adiciona a função selecionar para uma única transação (corrige o erro de tipagem)
    const selecionar = useCallback((transacao: Transacao | null) => {
        setTransacao(transacao)
    }, [])

    // Efeito para carregar transações quando usuário ou data mudar
    useEffect(() => {
        carregarTransacoes()
    }, [carregarTransacoes])



    async function salvar(transacao: Transacao, redirect = true) {
    if (!usuario) {
        console.error("Usuário não está logado!")
        return
    }
    
    // Verificar explicitamente se estamos editando ou criando
    const editando = !!transacao.id
    console.log('Operação:', editando ? 'Editando' : 'Criando nova transação')
    
    try {
        // Salvar e receber a transação atualizada com ID
        const transacaoComId = await servicos.financas.salvar(usuario, transacao)
        
        // Atualizar o estado com a transação retornada do Firebase
        setTransacoes(transacaoAtual => {
            const outrasTransacoes = transacaoAtual.filter(t => t.id !== transacaoComId.id)
            return [...outrasTransacoes, transacaoComId]
        })
        
        setTransacao(null)

                // Redirecionar para a página de finanças se solicitado
        if (redirect) {
          router.back()
        }
        
            
        return true;

    } catch (error) {
        console.error("Erro ao salvar transação:", error)
        return false
    }
}

   


    function excluir(transacao: Transacao) {
        if (!usuario || !transacao.id) {
            console.error("Usuário não está logado ou transação não tem ID!")
            return
        }
    
        const outrasTransacoes = transacoes.filter(t => t.id !== transacao.id)
        setTransacoes(outrasTransacoes)
        
        // Corrigido: Passando o objeto transação completo, não apenas o ID
        servicos.financas.excluir(usuario, transacao)
        
        setTransacao(null)
    }

    function atualizarData(novaData: Date) {
        setData(novaData)
    }   

    return {
        data,
        transacoes,
        transacao,
        selecionar, 
        salvar,
        excluir,
        alterarData: setData
    }
}