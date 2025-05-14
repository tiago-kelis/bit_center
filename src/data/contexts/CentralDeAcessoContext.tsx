import { createContext, useCallback, useEffect, useState } from "react"
import router from 'next/router'
import cookie from 'js-cookie'
import Usuario from "../../logic/core/usuario/Usuario"
import servicos from "../../logic/core"

interface CentralDeAcessoContextProps {
    pronto: boolean
    usuario: Usuario | null
    atualizarUsuario: (usuario: Usuario) => Promise<void>
    loginGoogle: () => Promise<Usuario | null>
    logout: () => Promise<void>
}

const CentralDeAcessoContext = createContext<CentralDeAcessoContextProps>({
    pronto: false,
    usuario: null,
    atualizarUsuario: async () => { },
    loginGoogle: async () => null,
    logout: async () => { },
})

export function CentralDeAcessoProvider(props: any) {
    const [pronto, setPronto] = useState<boolean>(false)
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    useEffect(() => {
        const cancelar = servicos.usuario.monitorarAutenticacao(usuario => {
            _autenticar(usuario)
            setPronto(true)
        })
        return () => cancelar()
    }, [])

    async function atualizarUsuario(novoUsuario: Usuario) {
        if (usuario && usuario.email !== novoUsuario.email) return logout()
        if (usuario && novoUsuario && usuario.email === novoUsuario.email) {
            await servicos.usuario.salvar(novoUsuario)
            setUsuario(novoUsuario)
        }
    }

    async function loginGoogle() {
        const usuario = await servicos.usuario.loginGoogle()
        if (!usuario) return null

        await _autenticar(usuario)
        router.push('/')

        return usuario
    }

    async function logout() {
        await servicos.usuario.logout()
        await _autenticar(null)
    }

    function _autenticar(usuario: Usuario | null) {
        if (usuario) {
            setUsuario(usuario)
            _configurarSessao(true)
            return usuario
        } else {
            setUsuario(null)
            _configurarSessao(false)
            return null
        }
    }

    function _configurarSessao(logado: boolean) {
        const nome = 'status-autenticacao'
        if (!logado) return cookie.remove(nome)

        cookie.set(nome, 'logado', {
            expires: 1,
            sameSite: 'None',
            secure: true
        })
    }

    return (
        <CentralDeAcessoContext.Provider value={{
            pronto,
            usuario,
            atualizarUsuario,
            loginGoogle,
            logout,
        }}>
            {props.children}
        </CentralDeAcessoContext.Provider>
    )
}

export default CentralDeAcessoContext