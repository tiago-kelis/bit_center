/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react"
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
    const [erro, setErro] = useState<any>(null)

    useEffect(() => {
        try {
            // Definir um timeout para garantir que não fique preso carregando
            const timeoutId = setTimeout(() => {
                if (!pronto) {
                    console.warn("Timeout na autenticação - forçando estado 'pronto'")
                    setPronto(true)
                    router.push('/') // Redirecionar para a página inicial
                }
            }, 10000) // 10 segundos de timeout
            
            const cancelar = servicos.usuario.monitorarAutenticacao(usuario => {
                try {
                    _autenticar(usuario)
                    setPronto(true)
                    clearTimeout(timeoutId) // Limpar o timeout se autenticação for bem-sucedida
                } catch (e) {
                    console.error("Erro durante autenticação:", e)
                    setErro(e)
                    setPronto(true) // Marcar como pronto mesmo com erro
                    router.push('/') // Redirecionar para a página inicial
                    clearTimeout(timeoutId)
                }
            })
            
            return () => {
                cancelar()
                clearTimeout(timeoutId)
            }
        } catch (e) {
            console.error("Erro ao configurar monitoramento de autenticação:", e)
            setErro(e)
            setPronto(true) // Marcar como pronto mesmo com erro
            router.push('/') // Redirecionar para a página inicial
        }
    }, [])

    // Observar mudanças de erro para redirecionamento
    useEffect(() => {
        if (erro && !pronto) {
            setPronto(true)
            router.push('/')
        }
    }, [erro])

    async function atualizarUsuario(novoUsuario: Usuario) {
        try {
            if (usuario && usuario.email !== novoUsuario.email) return logout()
            if (usuario && novoUsuario && usuario.email === novoUsuario.email) {
                await servicos.usuario.salvar(novoUsuario)
                setUsuario(novoUsuario)
            }
        } catch (e) {
            console.error("Erro ao atualizar usuário:", e)
            // Se for erro de permissão ou quota, fazer logout
            if (e instanceof Error && 
                (e.message.includes('permission') || e.message.includes('quota'))) {
                await logout()
            }
        }
    }

    async function loginGoogle() {
        try {
            const usuario = await servicos.usuario.loginGoogle()
            if (!usuario) return null

            await _autenticar(usuario)
            router.push('/')

            return usuario
        } catch (e) {
            console.error("Erro ao fazer login com Google:", e)
            setErro(e)
            setPronto(true)
            router.push('/')
            return null
        }
    }

    async function logout() {
        try {
            await servicos.usuario.logout()
            await _autenticar(null)
            router.push('/')
        } catch (e) {
            console.error("Erro ao fazer logout:", e)
            // Em caso de erro no logout, forçar limpeza local
            setUsuario(null)
            _configurarSessao(false)
            setPronto(true)
            router.push('/')
        }
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