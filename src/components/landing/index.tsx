import Pagina from "../templates/Pagina";
import Cabecalho from "./cabecalho";
import Comuns from "./comuns";
import Depoimentos from "./depoimentos";
import Destaques from "./destaques";
import Rodape from "./rodape";
import Vantagens from "./vantagens";

export default function Landing() {
    return (
       <Pagina>
            <Cabecalho/>
            <Comuns/>           
            <Destaques/>
            <Vantagens/>
            <Depoimentos/>
            <Rodape/>
       </Pagina>
    )
}