import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import Transacao from "../../../../logic/core/financas/Transacao"
import { TipoTransacao } from "../../../../logic/core/financas/TipoTransacao"
import FormularioTransacao from "../../formulario/index"
import Dinheiro from "../../../../logic/utils/Dinheiro"
import Data from "../../../../logic/utils/Data"

interface TransacaoItemProps {
    transacao: Transacao
    transacaoAlterada?: (transacao: Transacao) => Promise<void>
    transacaoExcluida?: (transacao: Transacao) => Promise<void>
}

export default function TransacaoItem(props: TransacaoItemProps) {
    return (
        <FormularioTransacao
            transacao={props.transacao}
            transacaoAlterada={props.transacaoAlterada}
            transacaoExcluida={props.transacaoExcluida}
        >
            <div className={`
                relative flex flex-col justify-between rounded-lg p-4 
                text-white overflow-hidden h-24
            `}>
                <div className={`
                    absolute top-0 left-0 w-full h-full
                    bg-gradient-to-r opacity-60
                    ${props.transacao.tipo === TipoTransacao.RECEITA
                        ? 'from-teal-500 via-green-600 to-teal-700'
                        : 'from-pink-500 via-red-600 to-pink-700'
                    }
                `}></div>
                <div className="flex justify-between items-center">
                    <span className="z-10 font-light opacity-75">{props.transacao.descricao}</span>
                    <span className="z-10 font-light text-xs opacity-75">
                        {Data.ddmmyy.formatar(props.transacao.data)}
                    </span>
                </div>
                <span className="z-10 text-3xl font-black">
                    {Dinheiro.formatar(props.transacao.valor)}
                </span>
                {props.transacao.tipo === TipoTransacao.RECEITA ? (
                    <IconTrendingUp
                        size={40}
                        stroke={1}
                        className="absolute bottom-1 right-2 text-white opacity-10"
                    />
                ) : (
                    <IconTrendingDown
                        size={40}
                        stroke={1}
                        className="absolute bottom-1 right-2 text-white opacity-10"
                    />
                )}
            </div>
        </FormularioTransacao>
    )
}