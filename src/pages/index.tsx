import Landing from "../components/landing"
import Financas from "../components/financas"
import useCentralDeAcesso from "../data/hooks/useCentralDeAcesso"
import Carregando from "../components/templates/Carregando"

export default function PaginaInicio() {
	const { usuario, pronto } = useCentralDeAcesso()
	if (!pronto) {
		return <Carregando />
	} else {
		return usuario ? <Financas /> : <Landing />
	}
}