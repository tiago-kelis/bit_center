/* eslint-disable @typescript-eslint/no-unused-vars */
import Transacao from "@/logic/core/financas/Transacao";


interface Formularioprops {
    transacao: Transacao
}

export default function Formulario(props: Formularioprops) {
    return (
        <div className={`
            flex flex-col border border-zinc-700
            rounded-xl overflow-hidden
        `}>
            <div className="bg-black py-3 px-7 text-zinc-500">Formulário</div>
        </div>
    )
}