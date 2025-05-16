// MiniFormulario.tsx
import { Button } from "@mantine/core";

interface MiniFormularioProps {
    titulo: string
    sub: string
    msgRodape?: string
    children: React.ReactNode
    podeSalvar?: boolean
    salvar?: () => void
    textoBotao?: string
    className?: string
}

export default function MiniFormulario(props: MiniFormularioProps) {
    return (
        <div className={`
            flex flex-col
            text-white overflow-hidden
            border border-zinc-700 rounded-lg
            w-full max-w-full
            bg-gradient-to-r from-zinc-900 to-zinc-800 p-3 
        `}>
            <div className="flex flex-col p-3">
                <div className="text-md font-black">{props.titulo}</div>
                <div className=" text-zinc-400 border border-zinc-600 p-2 rounded-md">{props.sub}</div>
                <div className=" w-full">
                    {props.children}
                </div>
            </div>
            <div className={`
                flex justify-end sm:justify-between items-center
                bg-black px-7 py-3 border border-zinc-600  rounded-md
            `}>
                <span className="hidden sm:inline text-zinc-400 ">{props.msgRodape}</span>
                <Button
                    color={props.podeSalvar ? "green" : "gray"}
                    className={`
                        ${props.podeSalvar ? "bg-green-500 hover:bg-green-600" : "bg-gray-700"}
                        transition-colors duration-200
                    `}
                    onClick={() => props.podeSalvar ? props.salvar?.() : undefined}
                >{props.textoBotao ?? 'Salvar'}</Button>
            </div>
        </div>
    );
}