import { IconForms } from "@tabler/icons-react"
import { TextInput } from "@mantine/core"
import Cabecalho from "../templates/Cabecalho"
import Conteudo from "../templates/Conteudo"
import Cpf from "../../logic/utils/Cpf"
import MiniFormulario from "../templates/MiniFormulario"
import Pagina from "../templates/Pagina"
// import servicos from "../../logic/core"
import Telefone from "../../logic/utils/Telefone"
import Texto from "../../logic/utils/Texto"
import TituloSecao from "../templates/TituloSecao"
import useCentralDeAcesso from "../../data/hooks/useCentralDeAcesso"
import useFormulario from "../../data/hooks/useFormulario"
import  Usuario from "../../logic/core/usuario/Usuario"


export default function CadastroUsuario() {
	const { usuario: usuarioAtual, atualizarUsuario } = useCentralDeAcesso()
	const { dados, alterarAtributo } = useFormulario<Usuario>(usuarioAtual?? {} as Usuario)

	async function salvar(atributo: string) {
		if (!usuarioAtual) return
		
		const novoUsuario = {
			...usuarioAtual,
			[atributo]: dados[atributo as keyof Usuario]
		}
	
		await atualizarUsuario(novoUsuario)
	}

	return (
		<Pagina>
			<Cabecalho />
			<Conteudo className="gap-5">
				<TituloSecao
					icone={<IconForms />}
					principal="Dados Cadastrais"
					sub="Informações de leonardomleitao@gmail.com"
				/>
				<MiniFormulario
					titulo="Seu Nome"
					sub="Esse é o nome usado pela plataforma em todas as suas interações."
					msgRodape="O nome deve possuir entre 3 e 80 caracteres, mais que isso já é um texto!"
					salvar={() => salvar('nome')}
					podeSalvar={Texto.entre(dados.nome ?? '', 3, 80)}
				>
					<TextInput
						value={dados.nome ?? ''}
						onChange={alterarAtributo('nome')}
					/>
				</MiniFormulario>
				<MiniFormulario
					titulo="CPF"
					sub="Seu CPF é usado internamente pelo sistema."
					msgRodape="Pode relaxar, daqui ele não sai!"
					salvar={() => salvar('cpf')}
					podeSalvar={Cpf.valido(dados.cpf ?? '')}
				>
					<TextInput
						value={Cpf.formatar(dados.cpf ?? '')}
						onChange={alterarAtributo('cpf', Cpf.desformatar)}
					/>
				</MiniFormulario>
				<MiniFormulario
					titulo="Telefone"
					sub="Usado para notificações importantes sobre a sua conta."
					msgRodape="Se receber ligação a cobrar, não foi a gente!"
					salvar={() => salvar('telefone')}
					podeSalvar={Telefone.valido(dados.telefone ?? '')}
				>
					<TextInput
						value={Telefone.formatar(dados.telefone ?? '')}
						onChange={alterarAtributo('telefone', Telefone.desformatar)}
					/>
				</MiniFormulario>
			</Conteudo>
		</Pagina>
	)
}