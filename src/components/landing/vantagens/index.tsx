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
                subtitulo="A tecnologia impulciona transformando sonhos em realidade, com uma dose de extraordinaria."
                inverter={false} // Primeira imagem inclinada para a esquerda (-rotate-6)
            />

            <Vantagem 
                imagem={Vantagem_2}
                titulo="Força para Novos desafios"
                subtitulo="Equilibrio nos torna mais coerentes e capazes de enfrentar os desafios adiante." 
                inverter={true} // Segunda imagem inclinada para a direita (rotate-6)                
            />

            <Vantagem 
                imagem={Vantagem_3}
                titulo="União"
                subtitulo="Coragem gera novos caminhos, novas possibilidades. Horizontes jamais imaginados se rstivéssimos desacreditados."
                inverter={false} // Terceira imagem inclinada para a esquerda (-rotate-6)
            />
          </div>
       </Area>
    )
}