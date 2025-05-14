export default interface Usuario {
    id: string
    nome: string
    email: string
    provedor: string
    imagemUrl?: string
    cpf?: string
    telefone?: string
}