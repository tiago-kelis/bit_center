import Cabecalho from "@/components/templates/Cabecalho";
import Conteudo from "@/components/templates/Conteudo";
import Pagina from "@/components/templates/Pagina";
import TituloSecao from "@/components/templates/TituloSecao";
import CadastroDeUsuario from "@/components/usuario/Cadastro";
// import { IconForms } from "@tabler/icons-react";


export default function CadastroUsuario() {
    return (
        <Pagina>
            <Cabecalho/>
            <Conteudo>               
                <CadastroDeUsuario />
            </Conteudo>          
        </Pagina>
    )
}