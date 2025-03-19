/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Cabecalho from "../templates/Cabecalho";
import Conteudo from "../templates/Conteudo";
import Pagina from "../templates/Pagina";
import Lista from "./Lista";
import Transacao, { transacaoVazia } from "@/logic/core/financas/Transacao";
import  TransacoesFalsas  from "@/data/constants/TransacoesFalsas";
import Formulario from "./Formulario";
import NaoEncontrado from "../templates/NaoEncontrado";
import Id from "@/logic/core/comun/Id";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";


export default function Financas() {
   
   const [transacoes, setTransacoes ] = useState<Transacao[]>(TransacoesFalsas);
   const [transacao, setTransacao ] = useState<Transacao | null>(null);  

      function salvar(transacao: Transacao){
         const outrasTransacoes = transacoes.filter(t => t.id !== transacao.id)
         setTransacoes([...outrasTransacoes, {
            ...transacao,
            id: transacao.id ?? Id.Novo()
         }])
         setTransacao(null)       
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

            <Button
               className={`bg-blue-500`}                
               onClick={() => setTransacao(transacaoVazia)}
            >
               <div className="flex justify-center p-1 gap-3">
               {<IconPlus className="bg-green-600 rounded-full"/>}
               Nova transacão
               </div>
            </Button>
            
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