import Area from "../comuns/Area";
import Slogan from "./Slogan";

export default function Destaques() {
    return (
       <Area id="inicio" className="pt-32">
          <div className={`h-[500px]`}>
            <Slogan/>
          </div>          
       </Area>
    )
}