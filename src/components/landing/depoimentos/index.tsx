import Area from "../comuns/Area";
import Depoimento from "./Depoimentos";

export default function Depoimentos() {
    return (
        <Area id="Depoimentos" className="bg-gradient-to-r from-black via-zinc-900 to-black py-10 sm:py-20">

            <div className="flex flex-col justify-center items-center gap-10">
                <h1 className="font-thin text-zinc-600 text-2xl sm:text-4xl">
                    As pessoas estão dizendo...
                </h1>
                <div className="flex justify-center xl:justify-between items-center gap-5">

                    <Depoimento
                       avatar="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png"
                       nome="Tiago Kelis"
                       titulo="Developer"
                       texto="Esatava sempre faltando algo ao tentar pagar as contas"
                    />

                    <Depoimento
                       avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgPqIuqI16d_gNruBel-EPg1VrpBeAzNmE35poXpl5em0iIledZwZtlplF3_iGWjxrin0&usqp=CAU"
                       nome="Raquel Ventura"
                       titulo="Infermeira"
                       texto="Esatava sempre faltando algo ao tentar pagar as contas"
                    />

                    <Depoimento
                       avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgFIG8vzDpzNXjlpY-ie2OMrKQgyoTc3fCftjstw4awWYT5NPMMEifi2NAhElCX4UgTOM&usqp=CAU"
                       nome="Jandira Alves"
                       titulo="Analista de Vendas"
                       texto="Esatava sempre faltando algo ao tentar pagar as contas"
                    />

                </div>

            </div>           
        </Area>
    );
}