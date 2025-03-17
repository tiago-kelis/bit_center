/* eslint-disable @typescript-eslint/no-unused-vars */
import "dayjs/locale/pt-br"
import Transacao from "@/logic/core/financas/Transacao";
import Dinheiro from "@/logic/utils/Dinheiro";
import { Button, Group, Radio, RadioGroup, TextInput } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";


interface Formularioprops {
    transacao: Transacao
}

export default function Formulario(props: Formularioprops) {
    return (
        <div className={`
            flex flex-col border border-zinc-700
            rounded-xl overflow-hidden
        `}>
            <div className="bg-black py-3 px-7 text-zinc-500">Formulário</div>
           <div className="flex flex-col gap-4 p-4 sm:p-7 text-zinc-500 ">
                <TextInput
                    label="Descrição"
                    value={props.transacao.descricao}                    
                    styles={{
                        input: {
                            backgroundColor: '#18181b', // Cor equivalente a bg-zinc-900
                            color: '#ffffff', // Cor do texto
                            width: '100%', // Ajusta a largura para ocupar todo o espaço disponível
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
                            backgroundColor: '#18181b', // Cor equivalente a bg-zinc-900
                            color: '#ffffff', // Cor do texto
                            width: '100%', // Ajusta a largura para ocupar todo o espaço disponível
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
                            backgroundColor: '#18181b', // Cor equivalente a bg-zinc-900
                            color: '#ffffff', // Cor do texto
                            width: '100%', // Ajusta a largura para ocupar todo o espaço disponível
                            padding: "5px",
                            border: "1px solid darkgray",
                            textAlign: 'left', // Alinha o texto à direita
                        },
                    }}
                />

                <div className="flex gap-2 mb-8 ml-8">
                    
                    <Radio.Group
                        value={props.transacao.tipo}
                        className="flex justify-center items-center gap-8"
                        >

                        <Group className="flex gap-16 ">

                            <Radio                                
                                value={TipoTransacao.RECEITA} label="Receita"
                                style={{
                                    width: "15px"
                                }}
                        
                            />

                            <Radio                               
                                value={TipoTransacao.DESPESA}  label="Despesas"
                                style={{
                                    width: "15px",                                   

                                }}
                            
                            />                        
                        
                        </Group>
                    </Radio.Group>                                
                    
                </div> 

                <div className="flex px-4 sm:px-7 py-4 gap-3 bg-zinc-800 rounded-md">
                    <Button 
                      className="bg-green-500 p-2 text-black" color="green"
                    >
                    Salvar</Button>

                    <Button 
                      className="bg-zinc-700 p-2 text-black" color="gray"
                    >
                    Voltar</Button>

                    {props.transacao.id && (
                        <Button 
                        className="bg-red-700 p-2 text-black" color="red"
                      >
                      Excluir</Button>                        
                    )}
                </div>                  
           
           </div>


        </div>
    )
}