import { useCallback, useEffect, useState, useRef } from "react"
import Transacao from "../../logic/core/financas/Transacao"
import ServicosFinancas from "../../logic/core/financas/ServicosFinancas"
import useCentralDeAcesso from "./useCentralDeAcesso"
import servicos from "@/logic/core"
import Id from "@/logic/core/comun/Id"

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

    function salvar(transacao: Transacao) {
        if (!usuario) {
            console.error("Usuário não está logado!")
            return
        }
        
        const outrasTransacoes = transacoes.filter(t => t.id !== transacao.id)
        
        const transacaoAtualizada = {
            ...transacao,
            id: transacao.id ?? Id.Novo()
        }
        
        setTransacoes([...outrasTransacoes, transacaoAtualizada])
        
        // Corrigido: Primeiro o usuário, depois a transação
        servicos.financas.salvar(usuario, transacaoAtualizada)
        
        setTransacao(null)
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
        selecionar, // Retorna a nova função selecionar
        salvar,
        excluir,
        alterarData: setData
    }
}