import usuario from "@/data/constants/UsuarioFalso";
import useCentralDeAcesso from "@/data/hooks/useCentralDeAcesso";
import { Avatar, Menu } from "@mantine/core";
import { IconArrowsRightLeft, IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";

interface MenuUsuarioProps {
    titulo_1: string
    titulo_2: string
    titulo_3: string
}

export default function MenuUsuario(props: MenuUsuarioProps) {

    const { usuario, logout } = useCentralDeAcesso()

    //titulo_1: "finanças", titulo_2: "Meus Dados", titulo_3: "Sair"


    return (
        <Menu>
            <Menu.Target>
            <div className="flex py-1.5 items-center gap-2 cursor-pointer">
                    <div className="hidden md:flex flex-col select-none">
                        <span className="text:sm font-bold text-zinc-300">{usuario?.nome}</span>
                        <span className="text-xs text-zinc-500">{usuario?.email}</span>
                    </div>
                    <Avatar
                    className="w-10 h-10"
                    radius="xl"
                    src={usuario?.imagemUrl ?? ""}
                    />
            </div>
            </Menu.Target>

            <Menu.Dropdown className=" flex flex-col absolute z-50 items-center justify-center bg-zinc-800 w-60 pr-3 pl-3 shadow-lg rounded">                
                    
                    
                <Menu.Label className=" flex justify-center items-center w-40  bg-zinc-900 rounded-md mt-2 mb-2">Usuario</Menu.Label>

                <div className="">
                    
                    <div className="flex gap-3 text-zinc-500 hover:bg-slate-900 p-1.5 rounded-md">
                    <Link href="/">
                            <Menu.Item>
                            <IconArrowsRightLeft className="text-zinc-300 cursor-pointer"/>                                
                            </Menu.Item>
                        </Link>
                        {props.titulo_1}
                    </div>

                    <div className="flex gap-3 text-zinc-500 hover:bg-slate-900 p-1.5 rounded-md">
                    <Link href="/usuario">
                            <Menu.Item>
                            <IconUser className="text-zinc-300 cursor-pointer"/>                                    
                            </Menu.Item>
                        </Link>
                        {props.titulo_2}
                    </div>

                    <Menu.Divider/>

                    <div className="flex gap-3 text-zinc-500 hover:bg-slate-900 p-1.5 rounded-md mb-2">
                    <Link href="/usuario">
                            <Menu.Item onClick={logout}>
                            <IconLogout className="text-red-700 cursor-pointer"/>                                                                
                            </Menu.Item>
                        </Link>
                        {props.titulo_3}
                    </div>

                </div>


                
            </Menu.Dropdown>
      </Menu>
    );
}
