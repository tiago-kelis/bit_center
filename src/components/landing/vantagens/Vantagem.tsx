/* eslint-disable @typescript-eslint/no-explicit-any */

import ImagemResponsiva from "../comuns/ImagemResponsiva"


export interface VantagemProps {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    imagem: any
    titulo: string
    subtitulo: string
    inverter?: boolean

}

export default function Vantagem (props: VantagemProps) {
    return (
        <div className={`flex flex-col justify-around items-center w-full gap-4
            ${props.inverter ? "sm:flex-row-reverse" : "sm:flex-row"}
        `}>
           <ImagemResponsiva 
                imagem={props.imagem} 
                className={props.inverter ? "rotate-6" : "-rotate-6"}
            />

            <div className={`
                 flex flex-col gap-y-4 sm:w-[350px]
                 text-center sm:text-left
            `}>
                <div className={`
                    flex flex-col text-white 
                    font-black text-2xl sm:text-4xl               
                 
                `}>{props.titulo}</div>

                {props.subtitulo && (
                    <span className="font-light text-base sm:text-lg text-zinc-500">
                        {props.subtitulo}
                    </span>
                )}

            </div>

        </div>
    )
}