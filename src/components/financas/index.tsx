/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Cabecalho from "../templates/Cabecalho";
import Conteudo from "../templates/Conteudo";
import Pagina from "../templates/Pagina";
import Lista from "./Lista";
import Transacao from "@/logic/core/financas/Transacao";
import  TransacoesFalsas  from "@/data/constants/TransacoesFalsas";
import Formulario from "./Formulario";



export default function Financas() {
   
   const [transacoes, setTransacoes ] = useState<Transacao[]>(TransacoesFalsas); 

    return (
       <Pagina>
         <Cabecalho/>
         <Conteudo className="gap-5">
            <Lista transacoes={transacoes}/>
            <Formulario transacao={transacoes[0]}/>
         </Conteudo>
       </Pagina>
    )
}