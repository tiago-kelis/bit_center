import Link from "next/link"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface MenuItemProps {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    children?: any
    url?: string
    onClick?: () => void
    className?: string
}

export default function MenuItem(props: MenuItemProps) {
    function RenderizarBotao() {
        return (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div className={`
                flex justify-center cursor-pointe m-2 p-2 rounded-md h-9 ${props.className ?? ""}
            `} onClick={props.onClick}>
                {props.children}
                    
            </div>
        )
    }
    
    return props.url? (
        <Link href={props.url ?? ""}>{RenderizarBotao()}</Link>
    ): RenderizarBotao()
}