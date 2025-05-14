import Cabecalho from "@/components/templates/Cabecalho";
import Conteudo from "@/components/templates/Conteudo";
import Pagina from "@/components/templates/Pagina";
import TituloSecao from "@/components/templates/TituloSecao";
import { IconForms } from "@tabler/icons-react";


export default function CadastroUsuario() {
    return (
        <Pagina>
            <Cabecalho/>
            <Conteudo>
                <TituloSecao
                    icone={<IconForms/>}
                    principal="Dados cadastrais"                    
                />
                Usuario !!!
            </Conteudo>
           
        </Pagina>
    )
}