import useCentralDeAcesso from "../../data/hooks/useCentralDeAcesso"

// https://unicode-table.com/en/1F44B/

export default function BoasVindas() {
    const { usuario } = useCentralDeAcesso()
    return (
        <div className={`text-white text-3xl font-black`}>
            Olá <span className="hidden sm:inline">{usuario?.nome?.split(' ')[0]}</span> 👋
        </div>
    )
}