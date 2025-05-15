export default interface Usuario {
    id: string
    nome: string
    email: string
    provedor: string
    imageUrl?: string
    cpf?: string
    telefone?: string
}