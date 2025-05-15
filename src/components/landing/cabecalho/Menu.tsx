import CentralDeAcessoContext from "@/data/contexts/CentralDeAcessoContext";
import MenuItem from "./MenuItem";
import {IconBrandGoogle} from "@tabler/icons-react"
import { useContext } from "react";
import Area from "../comuns/Area";

export default function Menu() {

     const {loginGoogle} = useContext(CentralDeAcessoContext)
    


    return (
         <div className="flex gap-2 bg-black">
            <MenuItem url="#Iníco" className="hidden sm:flex">
                 Início              
            </MenuItem>

            <MenuItem url="#Destaques" className="hidden sm:flex">
                 Destaques             
            </MenuItem>

            <MenuItem url="#Vanatgens" className="hidden sm:flex">
                 vantagens  
            </MenuItem>

            <MenuItem url="#Depoimentos" className="hidden sm:flex">
                 Depoimentos       
            </MenuItem>

            <MenuItem onClick={loginGoogle} className="bg-gradient-to-r from-indigo-600 to-cyan-600 cursor-pointer">
               <div className="flex items-center gap-2">
                    <IconBrandGoogle className="text-white" size={12}/>
                    <span className="text-white">Login</span>
               </div>               
            </MenuItem>


        </div>
    )
}