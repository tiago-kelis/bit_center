import Colecao from "../../firebase/db/Colecao";
import Transacao from "./Transacao";
import Usuario from "../usuario/Usuario";

export default class ServicosFinancas {
    private _colecao = new Colecao()

    async salvar(usuario: Usuario, transacao: Transacao) {
        return await this._colecao.salvar(
            `financas/${usuario.email}/transacoes`,
            transacao
        )
    }

    async excluir(usuario: Usuario, transacao: Transacao) {
        if (!transacao.id) return
        await this._colecao.excluir(
            `financas/${usuario.email}/transacoes`,
            transacao.id!
        )
    }

    async consultarPorMes(usuario: Usuario, data: Date) {
        const primeiro = new Date(data.getFullYear(), data.getMonth(), 1)
        const ultimo = new Date(data.getFullYear(), data.getMonth() + 1, 0, 23, 59, 59)

        const caminho = `financas/${usuario.email}/transacoes`
        return await this._colecao.consultarComFiltros(caminho, [
            { atributo: 'data', op: ">=", valor: primeiro },
            { atributo: 'data', op: "<=", valor: ultimo },
        ])
    }
}