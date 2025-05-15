import Area from "../comuns/Area";
import Slogan from "./Slogan";
import Principal from "../../../../public/segundo.jpg"
import ImagemResponsiva from "../comuns/ImagemResponsiva";

export default function Destaques() {
    return (
       <Area id="inicio" className="pt-28">
     
         <div className="flex items-center justify-around h-[500px] bg-gradient-to-r from-black via-zinc-900 to-black">
            <Slogan/>
            <ImagemResponsiva imagem={Principal} className="rotate-3 hidden md:inline w-48 h-48"/>
          </div>          
       </Area>
    )
}