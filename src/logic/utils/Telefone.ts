export default class Telefone {
    private static _padrao = '(??) ?????-????'
    
    static formatar(valor: string): string {
        const nums = valor.replace(/[^0-9]+/g, '').split('')
        return nums.reduce((formatado: string, num: string) => {
            return formatado.replace('?', num)
        }, Telefone._padrao).split('?')[0].replace(/[()-]$/, '')
    }

    static desformatar(valor: string): string {
        return valor.replace(/[^0-9]+/g, '')
    }

    static valido(valor: string): boolean {
        return Telefone.formatar(valor).length === Telefone._padrao.length
    }
}