import { Button, NumberInput, Popover } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconChevronLeft, IconChevronRight, IconSignLeft, IconSunLow } from "@tabler/icons-react";
import { useState } from "react";
import Data from "../../logic/utils/Data";

export interface CampoMesAnoProps {
    data?: Date
    dataMudou?: (data: Date) => void
}

export default function CampoMesAno(props: CampoMesAnoProps) {
    const hoje = new Date()

    const [data, setData] = useState<Date>(new Date(
        props.data?.getFullYear() ?? hoje.getFullYear(),
        props.data?.getMonth() ?? hoje.getMonth(),
        1
    ))

    function alterarAno(ano: number) {
        if (!ano) return
        const novaData = new Date(data)
        novaData.setFullYear(ano)
        setData(novaData)
        props.dataMudou?.(novaData)
    }

    function alterarMes(mes: number) {
        const novaData = new Date(data)
        novaData.setMonth(mes)
        setData(novaData)
        props.dataMudou?.(novaData)
    }

    function incrementar() {
        const novaData = new Date(data)
        novaData.setMonth(novaData.getMonth() + 1)
        setData(novaData)
        props.dataMudou?.(novaData)
    }

    function decrementar() {
        const novaData = new Date(data)
        novaData.setMonth(novaData.getMonth() - 1)
        setData(novaData)
        props.dataMudou?.(novaData)
    }

    return (
        <div className="flex items-center gap-2">
            <Button className={`
                flex justify-center items-center bg-red-500
                text-white cursor-pointer p-1
            `} color="red" onClick={decrementar}>
                <IconChevronLeft size={14} />
            </Button>
            <Popover withArrow>
                <Popover.Target>
                    <Button className={`
                        bg-gradient-to-r from-indigo-600 to-cyan-600
                        text-white cursor-pointer select-none                        
                        w-ull sm:w-44 px-3
                    `}>{Data.ddmmyy.formatar(data)}</Button>

                </Popover.Target>
                <Popover.Dropdown>
                   <div className="border border-zinc-200 p-3 rounded-md ml-4 -mt-[12.9rem] bg-zinc-900">
                        <div className="flex justify-center mb-5 text-zinc-800">
                           
                           <div className="flex items-center">
                                <Button 
                                    onClick={() => alterarAno(data.getFullYear() - 1)}
                                    disabled={data.getFullYear() <= 1900}
                                    size="xs"                          
                 
                                >
                                    < IconArrowLeft size={14} color="white"/>
                                </Button>
                                
                                <NumberInput
                                    value={data.getFullYear()}
                                    onChange={(value) => {
                                        const anoNumerico = typeof value === 'string' ? 
                                            parseInt(value, 10) : value;
                                            
                                        if (anoNumerico && !isNaN(anoNumerico)) {
                                            alterarAno(anoNumerico);
                                        }
                                    }}
                                    min={1900}
                                    max={2100}
                                    hideControls={true} // Esconder os controles padrão
                                    className="mx-2"
                                    styles={{
                                        input: { textAlign: 'center' }
                                    }}
                                />
                                
                                <Button 
                                    onClick={() => alterarAno(data.getFullYear() + 1)}
                                    disabled={data.getFullYear() >= 2100}
                                    size="xs"
                                    bg={"black"}
                                >
                                    <IconArrowRight size={14} color="white"/>
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 -mt-[10px]">
                            {Data.meses().map((mes, i) => {
                                const selecionada = data.getMonth() === i
                                return (
                                    <Button
                                        key={i}
                                        color={selecionada ? 'red' : 'blue'}
                                        className={`${selecionada ? 'bg-red-500' : 'bg-blue-500'}`}
                                        onClick={() => alterarMes(i)}
                                    >{mes}</Button>
                                )
                            })}
                        </div>
                   </div>
                </Popover.Dropdown>
            </Popover>
            <Button className={`
                flex justify-center items-center bg-red-500
                text-white cursor-pointer p-1
            `} color="red" onClick={incrementar}>
                <IconChevronRight size={14} />
            </Button>
        </div>
    )
}