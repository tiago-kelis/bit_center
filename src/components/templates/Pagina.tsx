import ForcarAutenticacao from "../autenticacao/ForcarAutenticacao"

interface PaginaProps {
    externa?: boolean
    children: any
    className?: string
}

export default function Pagina(props: PaginaProps) {
    function renderizarConteudo() {
        return (
            <div className={`pagina ${props.className ?? ''}`}>
                {props.children}
            </div>
        )
    }

    return props.externa ? renderizarConteudo() : (
        <ForcarAutenticacao>
            {renderizarConteudo()}
        </ForcarAutenticacao>
    )
}