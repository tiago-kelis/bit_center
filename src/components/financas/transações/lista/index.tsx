import Transacao from "../../../../logic/core/financas/Transacao"
import TransacaoItem from "./TransacaoItem"

interface ListaDeTransacoesProps {
    transacoes: Transacao[]
    transacaoAlterada?: (transacao: Transacao) => Promise<void>
    transacaoExcluida?: (transacao: Transacao) => Promise<void>
}

export default function ListaDeTransacoes(props: ListaDeTransacoesProps) {
    function renderizarTransacoes() {
        return props.transacoes.map((transacao, i) => {
            return (
                <TransacaoItem
                    key={transacao.id}
                    indice={i}
                    transacao={transacao}
                    transacaoAlterada={props.transacaoAlterada}
                    transacaoExcluida={props.transacaoExcluida}
                />
            )
        })
    }

    return (
        <div className={`
            flex flex-col border border-zinc-700
            rounded-lg overflow-hidden 
        `}>
            <div className="flex items-center gap-3 bg-black text-white p-3 ">
                <div className="hidden sm:block w-9 h-9"></div>
                <div className="font-black w-1/3">Descrição</div>
                <div className="flex justify-center font-black w-1/3">Data</div>
                <div className="flex justify-center font-black w-1/3">Valor</div>
                <div className="hidden sm:block w-11"></div>
            </div>
            {renderizarTransacoes()}
        </div>
    )
}