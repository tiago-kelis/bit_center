import Area from "../comuns/Area";
import Logo from "../comuns/Logo";
import Menu from "./Menu";

export default function Cabecalho() {
    return (
      <Area className="bg-black fixed z-50 border-b border-zinc-700">
         <div className="flex items-center justify-between h-20">
          <Logo/>
          <Menu/>
         </div>
      </Area>
    );
}