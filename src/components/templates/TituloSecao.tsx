import React from "react"

export interface TituloSecaoProps {
    icone?: any
    principal: string
    sub?: string
    className?: string
}

export default function TituloSecao(props: TituloSecaoProps) {
    return (
        <div className={`flex items-center gap-2 ${props.className ?? ''}`}>
            {props.icone && (
                <div className={`
                    text-zinc-500
                `}>{React.cloneElement(props.icone, {
                    stroke: 1,
                    size: props.sub ? 50 : 24
                })}</div>
            )}
            <div className="flex flex-col">
                <h2 className="text-zinc-500 text-2xl font-black">
                    {props.principal}
                </h2>
                <h3 className="text-zinc-500 text-sm font-thin -mt-1">
                    {props.sub}
                </h3>
            </div>
        </div>
    )
}