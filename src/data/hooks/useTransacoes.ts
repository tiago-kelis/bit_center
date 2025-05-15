import { useCallback, useEffect, useState, useRef } from "react"
import Transacao from "../../logic/core/financas/Transacao"
import ServicosFinancas from "../../logic/core/financas/ServicosFinancas"
import useCentralDeAcesso from "./useCentralDeAcesso"

export default function useTransacoes() {
    const { usuario } = useCentralDeAcesso()

    // Usando useRef para manter a referência estável de financas
    const financasRef = useRef(new ServicosFinancas())
    
    const [data, setData] = useState<Date>(new Date())
    const [transacoes, setTransacoes] = useState<Transacao[]>([])


    // Movido _atualizarTransacoes para antes de _consultarTransacoes e aplicado useCallback
    const _atualizarTransacoes = useCallback(async (transacoesAtualizadas: Transacao[]) => {
        if (!usuario) return
        const ordenadas = transacoesAtualizadas.sort()
        const apenasDoMes = ordenadas.filter(t => {
            return t.data.getMonth() === data.getMonth()
                && t.data.getFullYear() === data.getFullYear()
        })
        setTransacoes(apenasDoMes)
    }, [usuario, data])


    const _consultarTransacoes = useCallback(async () => {
        if (!usuario) return
        const transacoesConsultadas = await financasRef.current.consultarPorMes(usuario, data)
        _atualizarTransacoes(transacoesConsultadas)
    }, [usuario, data, _atualizarTransacoes]);


    useEffect(() => {
        _consultarTransacoes()
    }, [_consultarTransacoes]);
    

    function atualizarData(novaData: Date) {
        setData(novaData)
    }

    const salvarTransacao = useCallback(async (transacao: Transacao) => {
        if (!usuario) return
        const novaTransacao = await financasRef.current.salvar(usuario, transacao)
        const lista = transacoes.filter(reg => reg.id !== transacao.id)
        _atualizarTransacoes([...lista, novaTransacao])
    }, [usuario, transacoes, _atualizarTransacoes])

    const excluirTransacao = useCallback(async (transacao: Transacao) => {
        if (!usuario) return
        await financasRef.current.excluir(usuario, transacao)
        const lista = transacoes.filter(reg => reg.id !== transacao.id)
        _atualizarTransacoes(lista)
    }, [usuario, transacoes, _atualizarTransacoes])

    return {
        data,
        transacoes,
        atualizarData,
        salvarTransacao,
        excluirTransacao,
        alterarData: setData
    }
}