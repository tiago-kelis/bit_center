import Area from "../comuns/Area";
import Logo from "../comuns/Logo";
import RedeSociais from "./RedeSociais";

export default function Rodape() {
    return (
      <Area className="bg-black py-20">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Logo/>
            <div className="mt-3 text-zinc-400 text-center md:text-left">
              <div className="text-white">Plataforma Financeira</div>
              <div className="flex gap-1.5 font-thin text-zinc-500 ">que<span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">Simplifica</span>sua Vida</div>
            </div>
            <div className="flex text-zinc-600 items-center gap-20">
              <RedeSociais/>
              <div> <span className="text-3xl text-indigo-800">SkyGen</span> Todos os direiros reservados {new Date().getFullYear()} ® </div>
            </div>
        </div>              
      </Area>
    );
}