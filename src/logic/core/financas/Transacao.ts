import { TipoTransacao } from "./TipoTransacao"

export default interface Transacoes {
    id?: string
    descricao: string
    valor: number
    data: Date
    tipo: TipoTransacao    

}

export const transacaoVazia = {
    descricao: "",
    valor: 0,
    data: new Date(),
    tipo: TipoTransacao.DESPESA
}