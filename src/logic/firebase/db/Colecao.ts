import { v4 as uuidv4 } from 'uuid'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    OrderByDirection,
    query,
    setDoc,
    deleteDoc,
    where,
    QueryConstraint,
    DocumentData,
    DocumentSnapshot,
} from 'firebase/firestore'
import { WhereFilterOp } from '@firebase/firestore-types'
import { app } from '../config/app'

export interface Filtro {
    atributo: string
    op: WhereFilterOp
    valor: any
}

export default class Colecao {

    async salvar(caminho: string, entidade: any, id?: string): Promise<any> {
        const db = getFirestore(app)

        const idFinal = id ?? entidade.id ?? this._novoId()

        const docRef = doc(db, caminho, idFinal)
        await setDoc(docRef, this._converterParaFirebase(entidade))

        return {
            ...entidade,
            id: entidade.id ?? idFinal
        }
    }

    async consultar(caminho: string, ordenarPor?: string, direcao?: OrderByDirection): Promise<any[]> {
        const db = getFirestore(app)
        const colecaoRef = collection(db, caminho)
        const filtro: QueryConstraint[] = []
        const ordenacao = ordenarPor ? [orderBy(ordenarPor, direcao)] : []
        const consulta = query(colecaoRef, ...filtro, ...ordenacao)
        const resultado = await getDocs(consulta)
        return resultado.docs.map(this._converterDoFirebase) ?? []
    }

    async consultarPorId(caminho: string, id: string): Promise<any> {
        if (!id) return null
        const db = getFirestore(app)
        const docRef = doc(db, caminho, id)
        const resultado = await getDoc(docRef)
        return this._converterDoFirebase(resultado)
    }

    async consultarComFiltros(caminho: string, filtros: Filtro[],
        ordenarPor?: string, direcao?: OrderByDirection): Promise<any[]> {
        const db = getFirestore(app)
        const colecaoRef = collection(db, caminho)

        const filtrosWhere = filtros?.map(f => where(f.atributo, f.op, f.valor)) ?? []
        const ordenacao = ordenarPor ? [orderBy(ordenarPor, direcao)] : []

        const consulta = query(colecaoRef, ...filtrosWhere, ...ordenacao)
        const resultado = await getDocs(consulta)
        return resultado.docs.map(this._converterDoFirebase) ?? []
    }

    async excluir(caminho: string, id: string): Promise<boolean> {
        if (!id) return false
        const db = getFirestore(app)

        const docRef = doc(db, caminho, id)
        const itemNoBanco = await getDoc(docRef)
        if (!itemNoBanco.exists()) return false
        await deleteDoc(docRef)
        return true
    }

    private _novoId() {
        return uuidv4()
    }

    private _converterParaFirebase(entidade: any) {
        if (!entidade) return entidade
        return Object.keys(entidade).reduce((obj: any, atributo: string) => {
            const valor: any = entidade[atributo]
            return valor ? { ...obj, [atributo]: valor } : obj
        }, {})
    }

    private _converterDoFirebase(snapshot: DocumentSnapshot<DocumentData>) {
        const entidade: any = { ...snapshot.data(), id: snapshot.id }
        if (!entidade) return entidade
        return Object.keys(entidade).reduce((obj: any, atributo: string) => {
            const valor: any = entidade[atributo]
            return { ...obj, [atributo]: valor.toDate?.() ?? valor }
        }, {})
    }
}