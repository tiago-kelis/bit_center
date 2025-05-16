import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import Transacao from "../../../../logic/core/financas/Transacao"
import { TipoTransacao } from "../../../../logic/core/financas/TipoTransacao"
import FormularioTransacao from "../../formulario/index"
import { Switch } from "@mantine/core"
import Dinheiro from "../../../../logic/utils/Dinheiro"
import Data from "../../../../logic/utils/Data"

interface TransacaoItemProps {
    indice: number
    transacao: Transacao
    transacaoAlterada?: (transacao: Transacao) => Promise<void>
    transacaoExcluida?: (transacao: Transacao) => Promise<void>
}

export default function TransacaoItem(props: TransacaoItemProps) {
    const receita = props.transacao.tipo === TipoTransacao.RECEITA
    return (
        <div className={`
            relative flex items-center gap-3 text-white
            p-3 ${props.indice % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800'}
        `}>
            <FormularioTransacao
                transacao={props.transacao}
                transacaoAlterada={props.transacaoAlterada}
                transacaoExcluida={props.transacaoExcluida}
                className="flex items-center gap-3 w-full "
            >
                <div className={`
                    hidden sm:flex justify-center items-center
                    min-w-[36px] min-h-[36px] rounded-full
                    ${receita ? 'bg-green-500' : 'bg-red-500'}
                `}>
                    {receita ? (
                        <IconTrendingUp stroke={1} />
                    ) : (
                        <IconTrendingDown stroke={1} />
                    )}
                </div>
                <span className="w-1/3">{props.transacao.descricao}</span>
                <span className="hidden sm:flex justify-center w-1/3">
                    {Data.diaMes.formatar(props.transacao.data)}
                </span>
                <span className="flex sm:hidden justify-center w-1/3">
                    {Data.diaMes.formatar(props.transacao.data, true)}
                </span>
                <span className={`
                    flex justify-center w-1/3 font-bold
                    ${receita ? 'text-green-500' : 'text-red-500'}
                `}>
                    {Dinheiro.formatar(props.transacao.valor)}
                </span>
            </FormularioTransacao>
            <span className="hidden sm:block w-11 ">
                <Switch
                    className="flex"
                    checked={props.transacao.tipo === TipoTransacao.RECEITA}
                    onChange={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        const consolidada = e.currentTarget.checked
                        props.transacaoAlterada?.({
                            ...props.transacao,
                            tipo: consolidada ? TipoTransacao.RECEITA : TipoTransacao.DESPESA,
                        })
                    }}
                />
            </span>
        </div>
    )
}