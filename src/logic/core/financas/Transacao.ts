import { TipoTransacao } from "./TipoTransacao"

export default interface Transacao {
    id?: string
    descricao: string
    valor: number
    data: Date
    tipo: TipoTransacao    

}