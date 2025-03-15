import Area from "../comuns/Area";
import Vantagem from "./Vantagem";
import Vantagem_1 from "../../../../public/terceiro.jpg"
import Vantagem_2 from "../../../../public/quarta.jpg"
import Vantagem_3 from "../../../../public/quinto.png"


export default function Vantagens() {
    return (
       <Area id="Vanatgens" className="bg-black py-16 sm:py-36">
          <div className="flex flex-col items-center gap-y-16 sm:gap-y-36">
            <Vantagem 
                imagem={Vantagem_1}
                titulo="Muito foco."
                subtitulo="Vantagens transformam desafios em oportunidades."
            />

            <Vantagem 
                imagem={Vantagem_2}
                titulo="Força para Novos desafios"
                subtitulo="As vantagens nos impulsionam adiante."                
            />

            <Vantagem 
                imagem={Vantagem_3}
                titulo="União"
                subtitulo="Descobrir vantagens gera novos caminhos."
            />
          </div>
          
       </Area>
    )
}