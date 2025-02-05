import Link from "next/link"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface MenuItemProps {
    children?: any
    url?: string
    onClick?: () => void
    className?: string
}

export default function MenuItem(props: MenuItemProps) {
    function RenderizarBotao() {
        return (
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