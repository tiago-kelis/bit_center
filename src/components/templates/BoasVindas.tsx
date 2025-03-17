import UsuarioFalso from "@/data/constants/UsuarioFalso"


export default function BoaVindas() {

  const usuario = UsuarioFalso

  function renderizarNome() {
        return (
            <span className="hidden sm:inline">
            {usuario?.nome?.split(" ")[0]}
            </span>  
        )

   }

    return (
        <div className={`text-3xl font-black`}>
            Olá {renderizarNome()} 👋
        </div>
    )
}