/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Cabecalho from "../templates/Cabecalho";
import Conteudo from "../templates/Conteudo";
import Pagina from "../templates/Pagina";
import Lista from "./Lista";
import Transacao from "@/logic/core/financas/Transacao";
import  TransacoesFalsas  from "@/data/constants/TransacoesFalsas";
import Formulario from "./Formulario";
import NaoEncontrado from "../templates/NaoEncontrado";



export default function Financas() {
   
   const [transacoes, setTransacoes ] = useState<Transacao[]>(TransacoesFalsas);
   const [transacao, setTransacao ] = useState<Transacao | null>(null);  

      function salvar(transacao: Transacao){
       
      }

      function excluir(transacao: Transacao){
         console.log("excluir", transacao)
         const outrasTransacoes = transacoes.filter(t => t.id !== transacao.id)
         setTransacoes(outrasTransacoes)
         setTransacao(null)
      }

   return (
      <Pagina>
         <Cabecalho/>
         <Conteudo className="gap-5">
            
            {transacao ? (
               <Formulario
               transacao={transacao}
               salvar={salvar}
               excluir={excluir}
               cancelar={() => setTransacao(null)}
               />
               
            ): transacoes.length ? (
               <Lista transacoes={transacoes} selecionarTransacao={setTransacao}/>
            ): (
               <NaoEncontrado>
                  Nenhuma transação encontrada
               </NaoEncontrado>
            )}
                        
         </Conteudo>
      </Pagina>
   )
}