/* eslint-disable @typescript-eslint/no-unused-vars */
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";
import Transacao from "@/logic/core/financas/Transacao";
import Data from "@/logic/utils/Data";
import Dinheiro from "@/logic/utils/Dinheiro";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

interface ListaProps {
    transacoes: Transacao[]
}

export default function Lista(props: ListaProps) {

    function renderizarTipo(transacao: Transacao) {
        return (
            <span className={`
                flex justify-center items-center
                h-8 w-8 md:w-10 p-1.5 rounded-full
                ${transacao.tipo === TipoTransacao.RECEITA ? "bg-green-500" : "bg-red-500"}
            `}>
                {transacao.tipo === TipoTransacao.RECEITA ? <IconTrendingUp/> : <IconTrendingDown/>}
            </span>
        )
    }

    function renderizarLinha(transacao: Transacao, indice: number) {
        return (
            <div key={transacao.id} className={`

                flex items-center gap-3 p-3 cursoe-cursor-pointer
                ${indice % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800"}
            
            `} onClick={() => {}}>

                {renderizarTipo(transacao)}

                <span className="w-full md:w-1/2">{transacao.descricao}</span>
                <span className="hidden md:inline flex-1">{Data.ddmmyy.formatar(transacao.data)}</span>
                <span>{Dinheiro.formatar(transacao.valor)}</span>                        
            </div>
        )
    }

    return (
        <div className={`
            flex flex-col
            border border-zinc-700
            rounded-xl overflow-hidden
        `}>
            {props.transacoes.map(renderizarLinha)}
        </div>
    )
}