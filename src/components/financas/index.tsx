/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react";
import Cabecalho from "../templates/Cabecalho";
import Conteudo from "../templates/Conteudo";
import Pagina from "../templates/Pagina";
import Lista from "./Lista";
import Formulario from "./Formulario";
import NaoEncontrado from "../templates/NaoEncontrado";
import Id from "@/logic/core/comun/Id";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import servicos from "@/logic/core";
import CentralDeAcessoContext from "@/data/contexts/CentralDeAcessoContext";
import CampoMesAno from "../templates/CampoMesAno";
import useTransacoes from "@/data/hooks/useTransacoes";
import Transacao from "@/logic/core/financas/Transacao";

export default function Financas() {
   const { usuario } = useContext(CentralDeAcessoContext);
   const [transacoes, setTransacoes] = useState<Transacao[]>([]);
   const [transacao, setTransacao] = useState<Transacao | null>(null);  

   const {data, alterarData} = useTransacoes();

   function salvar(transacao: Transacao) {
      if (!usuario) {
         console.error("Usuário não está logado!");
         return;
      }
      
      const outrasTransacoes = transacoes.filter(t => t.id !== transacao.id);
      const novaTransacao = {
         ...transacao,
         id: transacao.id ?? Id.Novo()
      };
      
      setTransacoes([...outrasTransacoes, novaTransacao]);
      
      // Corrigido: Primeiro o usuário, depois a transação
      servicos.financas.salvar(usuario, novaTransacao);
      
      setTransacao(null);       
   }

   function excluir(transacao: Transacao) {
      if (!usuario || !transacao.id) {
         console.error("Usuário não está logado ou transação não tem ID!");
         return;
      }
   
      console.log("excluir", transacao);
      const outrasTransacoes = transacoes.filter(t => t.id !== transacao.id);
      setTransacoes(outrasTransacoes);
      
      // Corrigido: Passando o objeto transação completo, não apenas o ID
      servicos.financas.excluir(usuario, transacao);
      
      setTransacao(null);
   }


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
               onClick={() => setTransacao(transacao)}
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
                  cancelar={() => setTransacao(null)}
               />
            ) : transacoes.length ? (
               <Lista transacoes={transacoes} selecionarTransacao={setTransacao}/>
            ) : (
               <NaoEncontrado>
                  Nenhuma transação encontrada
               </NaoEncontrado>
            )}
         </Conteudo>
      </Pagina>
   );
}