import 'dayjs/locale/pt-br'
import { Button, Modal, Radio, Switch, TextInput } from "@mantine/core"
import { DatePickerInput } from '@mantine/dates' // Modificado: DatePickerInput em vez de DatePicker
import { TipoTransacao } from "../../../logic/core/financas/TipoTransacao"
import { useEffect, useState } from "react"
import Data from "../../../logic/utils/Data"
import Dinheiro from "../../../logic/utils/Dinheiro"
import Transacao from "../../../logic/core/financas/Transacao"
import useFormulario from "../../../data/hooks/useFormulario"

// Atualizando a interface Transacao para incluir o campo consolidada
interface TransacaoFormulario extends Transacao {
    consolidada: boolean;
}

export interface FormularioTransacaoProps {
    transacao?: Transacao
    transacaoAlterada?: (transacao: Transacao) => Promise<void>
    transacaoExcluida?: (transacao: Transacao) => Promise<void>
    children: any
    className?: string
}

export default function FormularioTransacao(props: FormularioTransacaoProps) {
    const transacaoVazia: TransacaoFormulario = {
        descricao: '', 
        valor: 0, 
        data: new Date(),
        tipo: TipoTransacao.DESPESA,
        consolidada: false
    }

    const [aberto, setAberto] = useState<boolean>(false)
    const { dados, alterarAtributo, alterarDados } = useFormulario<TransacaoFormulario>(
        props.transacao as TransacaoFormulario ?? transacaoVazia
    )

    useEffect(() => {
        alterarDados(props.transacao as TransacaoFormulario ?? transacaoVazia)
    }, [props.transacao])

    async function salvar() {
        if (props.transacaoAlterada) {
            // Remover propriedades que não fazem parte de Transacao antes de enviar
            const { consolidada, ...transacaoParaSalvar } = dados;
            await props.transacaoAlterada(transacaoParaSalvar);
        }
        setAberto(false)
        alterarDados(transacaoVazia)
    }

    function handleExcluir() {
        if (props.transacao && props.transacaoExcluida) {
            props.transacaoExcluida(props.transacao);
        }
    }

    // Função para parsear datas se o utilitário Data.completa não existir
    function parsearData(dateString: string): Date {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // meses em JS são 0-11
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
        return new Date();
    }

    return (
        <>
            <Modal
                opened={aberto}
                onClose={() => setAberto(false)}
                title="Transação Financeira"
            >
                <div className="flex flex-col gap-3">
                    <Radio.Group
                        value={dados.tipo}
                        onChange={alterarAtributo('tipo')}
                    >
                        <Radio value={TipoTransacao.RECEITA} label="Receita" />
                        <Radio value={TipoTransacao.DESPESA} label="Despesa" />
                    </Radio.Group>
                    <TextInput
                        label="Descrição"
                        value={dados.descricao}
                        onChange={alterarAtributo('descricao')}
                    />
                    <TextInput
                        label="Valor"
                        value={Dinheiro.formatar(dados.valor)}
                        onChange={alterarAtributo('valor', Dinheiro.desformatar)}
                    />
                    {/* Substituindo DatePicker por DatePickerInput */}
                    <DatePickerInput
                        label="Data"
                        value={dados.data}
                        locale="pt-br"
                        valueFormat={Data.ddmmyy.formatar(dados.data, '-')}
                        allowDeselect={false}
                        clearable={false}
                        onChange={alterarAtributo('data')}
                    />
                    <Switch
                        label="Consolidado"
                        checked={dados.consolidada}
                        onChange={alterarAtributo('consolidada')}
                    />
                    <div className="flex justify-between mt-7">
                        <div className="flex gap-2">
                            <Button className="bg-blue-600" onClick={salvar}>
                                Salvar
                            </Button>
                            <Button className="bg-gray-700" color="gray" onClick={() => setAberto(false)}>
                                Cancelar
                            </Button>
                        </div>
                        {props.transacao && (
                            <Button 
                                className="bg-red-600" 
                                color="red" 
                                onClick={handleExcluir}
                            >
                                Excluir
                            </Button>
                        )}
                    </div>
                </div>
            </Modal>

            <div className={`
                cursor-pointer ${props.className ?? ''}
            `} onClick={() => setAberto(true)}>
                {props.children}
            </div>
        </>
    )
}