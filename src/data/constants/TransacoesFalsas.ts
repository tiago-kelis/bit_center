/* eslint-disable @typescript-eslint/no-unused-vars */
import Id from "@/logic/core/comun/Id";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";
import Transacao from "@/logic/core/financas/Transacao";


const transacoesFalsas: Transacao[] = [

    {
        id:Id.Novo(),
        descricao: "Salario",
        data: new Date(2024, 4, 1),
        valor: 7123.34,
        tipo: TipoTransacao.RECEITA

    },
    {
        id:Id.Novo(),
        descricao: "Aluguel",
        data: new Date(2025, 3, 17),
        valor: 8193.36,
        tipo: TipoTransacao.DESPESA

    },
    {
        id:Id.Novo(),
        descricao: "Conta de Luz",
        data: new Date(2025, 3, 17),
        valor: 4523.89,
        tipo: TipoTransacao.DESPESA
    },
    {
        id:Id.Novo(),
        descricao: "Extras",
        data: new Date(2025, 3, 11),
        valor: 600.75,
        tipo: TipoTransacao.RECEITA
    }
]

export default transacoesFalsas

