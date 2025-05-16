/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Cabecalho from "../templates/Cabecalho";
import Conteudo from "../templates/Conteudo";
import Pagina from "../templates/Pagina";
import Lista from "./Lista";
import Formulario from "./Formulario";
import NaoEncontrado from "../templates/NaoEncontrado";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import CampoMesAno from "../templates/CampoMesAno";
import useTransacoes from "@/data/hooks/useTransacoes";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";


export default function Financas() {

   const { transacoes, selecionar, transacao, salvar, data, alterarData, excluir } = useTransacoes()
  
  

   return (
      <Pagina>
         <Cabecalho/>
         <Conteudo className="gap-5">
            <CampoMesAno 
               data={data}
               dataMudou={alterarData}
            />

            <Button
               className={`bg-blue-500`}                
               onClick={() => {
                  // Criar uma transação nova e vazia (sem ID)
                  const novaTransacao = {
                     descricao: '',
                     valor: 0,
                     data: new Date(),
                     tipo: TipoTransacao.DESPESA
                     // SEM ID!
                  }
                  selecionar(novaTransacao)
               }}
            >
               <div className="flex justify-center p-1 gap-3">
                  <IconPlus className="bg-green-600 rounded-full"/>
                  Nova transacão
               </div>
            </Button>
           
            
            {transacao ? (
               <Formulario
                  transacao={transacao}
                  salvar={salvar}
                  excluir={excluir}
                  cancelar={() => selecionar(null)}
               />
            ) : transacoes.length ? (
               <Lista transacoes={transacoes} selecionarTransacao={selecionar}/>
            ) : (
               <NaoEncontrado>
                  Nenhuma transação encontrada
               </NaoEncontrado>
            )}
         </Conteudo>
      </Pagina>

     
   );
}