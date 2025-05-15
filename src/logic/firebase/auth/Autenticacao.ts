import {
    User,
    Auth,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onIdTokenChanged,
} from 'firebase/auth'
import Usuario from '../../core/usuario/Usuario'
import { app } from '../config/app'

export declare type ObservadorUsuario = (usuario: Usuario | null) => void
export declare type CancelarObservacao = () => void

export default class Autenticacao {
    private _auth: Auth

    constructor() {
        this._auth = getAuth(app)
    }

    async loginGoogle(): Promise<Usuario | null> {
        const resp = await signInWithPopup(this._auth, new GoogleAuthProvider())
        return this.usuarioNormalizado(resp.user)
    }

    async logout(): Promise<void> {
        await signOut(this._auth)
    }

    monitorar(observador: ObservadorUsuario): CancelarObservacao {
        return onIdTokenChanged(this._auth, async (usuarioFirebase) => {
            const usuario = await this.usuarioNormalizado(usuarioFirebase)
            observador(usuario)
        })
    }

    private async usuarioNormalizado(usuarioFirebase: User | null): Promise<Usuario | null> {
        if (!usuarioFirebase) return null
        const nomeAlternativo = usuarioFirebase.email!.split('@')[0]

        return {
            id: usuarioFirebase.uid,
            nome: usuarioFirebase.displayName ?? nomeAlternativo,
            email: usuarioFirebase.email!,
            provedor: usuarioFirebase.providerData[0].providerId,
            imageUrl: usuarioFirebase.photoURL ?? undefined,
        }
    }
}