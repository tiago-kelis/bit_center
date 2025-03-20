import Transacao from "@/logic/core/financas/Transacao"
import { useState } from "react"


export default function useFormulario(dadosInicial: Transacao) {

    const [dados, setDados] = useState(dadosInicial)

    function alterarAtributo(atributo: string, fn?: Function) {
        return (valorOUEvento: any) => {
            const v = valorOUEvento?.target?.value ?? valorOUEvento
            setDados({ ...dados, [atributo]: fn?.(v) ?? v})
        }
    }

    return {
        dados,
        alterarDados: setDados,
        alterarAtributo,
    }
    
}