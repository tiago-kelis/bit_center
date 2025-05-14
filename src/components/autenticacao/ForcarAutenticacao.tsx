import { useRouter } from 'next/router'
import useCentralDeAcesso from '../../data/hooks/useCentralDeAcesso'
import Carregando from '../templates/Carregando'

interface ForcarAutenticacaoProps {
    children: any
}

export default function ForcarAutenticacao(props: ForcarAutenticacaoProps) {
    const router = useRouter()
    const { pronto, usuario } = useCentralDeAcesso()

    if (!pronto) {
        return <Carregando />
    } else if (usuario?.email) {
        return props.children
    } else {
        router.push('/')
        return <Carregando />
    }
}