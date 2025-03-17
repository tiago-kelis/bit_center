import BoaVindas from "./BoasVindas";
import MenuUsuario from "./MenuUsuario";


export default function Cabecalho() {
    return (
       <div className="flex justify-between items-center p-5 border-b border-zinc-800 bg-black">
         <BoaVindas/>
         <MenuUsuario titulo_1="finanças" titulo_2="Meus Dados" titulo_3="Sair"/>     
       </div>   
    )
}