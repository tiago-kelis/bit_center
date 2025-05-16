/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Cabecalho from "../templates/Cabecalho";
import Conteudo from "../templates/Conteudo";
import Pagina from "../templates/Pagina";
import Lista from "./Lista";
import Formulario from "./Formulario";
import NaoEncontrado from "../templates/NaoEncontrado";
import { Button } from "@mantine/core";
import { IconLayoutGrid, IconList, IconPlus } from "@tabler/icons-react";
import CampoMesAno from "../templates/CampoMesAno";
import useTransacoes, { TipoExibir } from "@/data/hooks/useTransacoes";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";
import Grade from "./transações/grade/TransacaoItem";


export default function Financas() {

   const {     
      transacoes,
      selecionar,
      transacao,
      tipoExibir,
      salvar,
      data,
      alterarData,
      alterarTipoExibicao,
      excluir,
   } = useTransacoes()

   function renderizarControle () {
      return (
        <div className="flex justify-between">

            <CampoMesAno 
               data={data}
               dataMudou={alterarData}
            />

           <div className="flex flex-row gap-2 ">

               <Button
                   unstyled  // Esta prop remove todos os estilos padrão do Mantine
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

               <div className="flex border border-gray-700 rounded overflow-hidden">
                  <button 
                        className={`px-3 py-1 transition-colors ${tipoExibir === 'lista' ? 'bg-gray-800 text-white' : 'bg-transparent text-gray-400'}`}
                        onClick={() => alterarTipoExibicao('lista' as TipoExibir)}
                  >
                        <IconList size={16} />
                  </button>
                  <button 
                        className={`px-3 py-1 transition-colors ${tipoExibir === 'grade' ? 'bg-gray-800 text-white' : 'bg-transparent text-gray-400'}`}
                        onClick={() => alterarTipoExibicao('grade' as TipoExibir)}
                  >
                        <IconLayoutGrid size={16} />
                  </button>
               </div>

              
           </div>           
        </div>
           
      )
   }


   function renderizarTipoExibir() {
      return tipoExibir === 'lista' ? (
         <Lista transacoes={transacoes} selecionarTransacao={selecionar}/>
      ): (
         <Grade transacoes={transacoes} selecionarTransacao={selecionar}/>         
      )
   }
  
  

   return (
      <Pagina>
         <Cabecalho/>
         <Conteudo className="gap-5">            

           {renderizarControle()}
            
            {transacao ? (
               <Formulario
                  transacao={transacao}
                  salvar={salvar}
                  excluir={excluir}
                  cancelar={() => selecionar(null)}
               />
            ) : transacoes.length ? (

               renderizarTipoExibir() 

            ) : (
               <NaoEncontrado>
                  Nenhuma transação encontrada
               </NaoEncontrado>
            )}
         </Conteudo>
      </Pagina>

     
   );
}