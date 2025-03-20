import "dayjs/locale/pt-br";
import Transacao from "@/logic/core/financas/Transacao";
import Dinheiro from "@/logic/utils/Dinheiro";
import { Button, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";
import useFormulario from "@/data/hooks/useFormulario";

interface Formularioprops {
  transacao: Transacao;
  salvar?: (transacao: Transacao) => void;
  excluir?: (transacao: Transacao) => void;
  cancelar?: () => void;
}

export default function Formulario(props: Formularioprops) {

  const {dados, alterarDados, alterarAtributo} = useFormulario(props.transacao)

  return (
    <div
      className={`
        flex flex-col border border-zinc-700
        rounded-xl overflow-hidden
      `}
    >
      <div className="bg-black py-3 px-7 text-zinc-500">Formulário</div>
      <div className="flex flex-col gap-4 p-4 sm:p-7 text-zinc-500 ">
        <TextInput
          label="Descrição"
          value={dados.descricao}
          onChange={alterarAtributo("descricao")}            
          styles={{
            input: {
              backgroundColor: "#18181b",
              color: "#ffffff",
              width: "100%",
              padding: "5px",
              border: "1px solid darkgray",
            },
          }}          
        />

        <TextInput
          label="Valor"
          value={Dinheiro.formatar(dados.valor)}
          onChange={alterarAtributo("valor", Dinheiro.desformatar)}
          styles={{
            input: {
              backgroundColor: "#18181b",
              color: "#ffffff",
              width: "100%",
              padding: "5px",
              border: "1px solid darkgray",
            },
          }}
        />

        <DatePickerInput
          label="Data"
          value={dados.data}
          locale="pt-BR"
          valueFormat="DD/MM/YYYY"         
          styles={{
            input: {
              backgroundColor: "#18181b",
              color: "#ffffff",
              width: "100%",
              padding: "5px",
              border: "1px solid darkgray",
              textAlign: "left",
            },
          }}
        />

        <div className="flex items-center gap-8 mb-8">

          <label className="flex items-center gap-2">
                <input
                type="radio"
                name="tipo"
                value="RECEITA"               
                onChange={() => (dados.tipo = TipoTransacao.RECEITA, alterarAtributo(TipoTransacao.RECEITA))}
                // checked={dados.tipo === TipoTransacao.RECEITA}
                
                className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-600"
                />
                <span className="text-white">Receita</span>
          </label>

          <label className="flex items-center gap-2">
                <input
                type="radio"
                name="tipo"
                value="DESPESA"               
                onChange={() => (dados.tipo = TipoTransacao.DESPESA, alterarAtributo(TipoTransacao.DESPESA))}
                // checked={dados.tipo === TipoTransacao.DESPESA}
                className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-600"
                />
                <span className="text-white">Despesas</span>
          </label>

        </div>

        <div className="flex px-3 sm:px-7 py-3 gap-3 bg-zinc-800 rounded-md">
          <Button
            className="bg-green-500 p-2 text-black"
            color="green"
            onClick={() => props.salvar?.(dados)}
          >
            Salvar
          </Button>

          <Button
            className="bg-yellow-600 p-2 text-black"
            color="gray"
            onClick={props.cancelar}
          >
            Voltar
          </Button>

          {dados.id && (
            <Button
              className="bg-red-700 p-2 text-black"
              color="red"
              onClick={() => props.excluir?.(dados)}
            >
              Excluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
