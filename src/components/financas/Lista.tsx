/* eslint-disable @typescript-eslint/no-unused-vars */
import Transacao from "@/logic/core/financas/Transacao"


interface ListaProps {
    transacoes: Transacao[]
}

export default function Lista(props: ListaProps) {

    function renderizarLinha(transacao: Transacao) {
        return (
            <div key={transacao.id}>
                <span>{transacao.descricao}</span>
                <span>{transacao.valor}</span>         
            </div>
        )
    }

    return (
        <div>
            {props.transacoes.map(renderizarLinha)}
        </div>
    )
}