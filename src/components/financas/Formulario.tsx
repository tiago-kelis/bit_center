/* eslint-disable @typescript-eslint/no-unused-vars */
import "dayjs/locale/pt-br";
import Transacao from "@/logic/core/financas/Transacao";
import Dinheiro from "@/logic/utils/Dinheiro";
import { Button, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";

interface Formularioprops {
  transacao: Transacao;
  salvar?: (transacao: Transacao) => void;
  excluir?: (transacao: Transacao) => void;
  cancelar?: () => void;
}

export default function Formulario(props: Formularioprops) {
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
          value={props.transacao.descricao}
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
          value={Dinheiro.formatar(props.transacao.valor)}
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
          value={props.transacao.data}
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
                checked={props.transacao.tipo === TipoTransacao.RECEITA}
                onChange={() => (props.transacao.tipo = TipoTransacao.RECEITA)}
                className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-600"
                />
                <span className="text-white">Receita</span>
          </label>

          <label className="flex items-center gap-2">
                <input
                type="radio"
                name="tipo"
                value="DESPESA"
                checked={props.transacao.tipo === TipoTransacao.DESPESA}
                onChange={() => (props.transacao.tipo = TipoTransacao.DESPESA)}
                className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-600"
                />
                <span className="text-white">Despesas</span>
          </label>

        </div>

        <div className="flex px-4 sm:px-7 py-4 gap-3 bg-zinc-800 rounded-md">
          <Button
            className="bg-green-500 p-2 text-black"
            color="green"
            onClick={() => props.salvar?.(props.transacao)}
          >
            Salvar
          </Button>

          <Button
            className="bg-zinc-700 p-2 text-black"
            color="gray"
            onClick={props.cancelar}
          >
            Voltar
          </Button>

          {props.transacao.id && (
            <Button
              className="bg-red-700 p-2 text-black"
              color="red"
              onClick={() => props.excluir?.(props.transacao)}
            >
              Excluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
