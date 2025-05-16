import { useState } from "react"


export default function useFormulario<T = any>(dadosInicial: T) {

    const [dados, setDados] = useState<T>(dadosInicial)

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