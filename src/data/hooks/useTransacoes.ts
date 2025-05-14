import { useEffect, useState } from "react"
import Transacao from "../../logic/core/financas/Transacao"
import ServicosFinancas from "../../logic/core/financas/ServicosFinancas"
import useCentralDeAcesso from "./useCentralDeAcesso"




export default function useTransacoes() {
    const { usuario } = useCentralDeAcesso()
    const financas = new ServicosFinancas()

    const [data, setData] = useState<Date>(new Date())
    const [transacoes, setTransacoes] = useState<Transacao[]>([])

    useEffect(() => {
        _consultarTransacoes()
    }, [data, usuario])

    function atualizarData(data: Date) {
        setData(data)
    }

    async function salvarTransacao(transacao: Transacao) {
        if (!usuario) return
        const novaTransacao = await financas.salvar(usuario, transacao)
        const lista = transacoes.filter(reg => reg.id !== transacao.id)
        _atualizarTransacoes([...lista, novaTransacao])
    }

    async function excluirTransacao(transacao: Transacao) {
        if (!usuario) return
        await financas.excluir(usuario, transacao)
        const lista = transacoes.filter(reg => reg.id !== transacao.id)
        _atualizarTransacoes(lista)
    }

    async function _consultarTransacoes() {
        if (!usuario) return
        const transacoes = await financas.consultarPorMes(usuario, data)
        _atualizarTransacoes(transacoes)
    }

    async function _atualizarTransacoes(transacoes: Transacao[]) {
        if (!usuario) return
        const ordenadas = transacoes.sort()
        const apenasDoMes = ordenadas.filter(t => {
            return t.data.getMonth() === data.getMonth()
                && t.data.getFullYear() === data.getFullYear()
        })
        setTransacoes(apenasDoMes)
    }

    return {
        data,
        transacoes,
        atualizarData,
        salvarTransacao,
        excluirTransacao,
    }
}