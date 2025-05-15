

export default class Data {

    static _lingua = "pt-BR"


    static ddmmyy = {
        formatar(dt: Date, separador: string = "/"): string {
            const dia = dt.getDate().toString().padStart(2, "0")
            const mes = (dt.getMonth() + 1).toString().padStart(2, "0")
            return `${dia}${separador}${mes}${separador}${dt.getFullYear()}`
        }
    }

    static mmyy = {
        formatar(dt: Date, lingua?: string): string {
           return dt.toLocaleDateString(lingua ?? Data._lingua, { 
            month: "long",
            year: "numeric"
         } as Intl.DateTimeFormatOptions)  
        },

    }

   static meses() {
    return Array(12).fill(0).map((_, i) => 
            new Date(2000, i, 1)
            .toLocaleDateString(Data._lingua, { month: "short" })
            .toUpperCase()
            .substring(0, 3)
        )
    
    }

    static primeiroDia(dt: Date) {
        return new Date(dt.getFullYear(), dt.getMonth(), 1)

    }

    static ultimoDia(dt: Date) {
        return new Date(dt.getFullYear(), dt.getMonth() + 1, 0, 23, 59, 59)
    }

        static diaMes = {
        formatar(data: Date, menor?: boolean): string {
            return data?.toLocaleDateString?.(
                Data._lingua, {
                    day: '2-digit',
                    month: menor ? '2-digit' : 'short',
                } as Intl.DateTimeFormatOptions
            )
        }
    }

    static mesAno = {
        formatar(data: Date, menor?: boolean): string {
            return data?.toLocaleDateString?.(
                Data._lingua, {
                    month: menor ? 'short' : 'long',
                    year: 'numeric',
                } as Intl.DateTimeFormatOptions
            )
        }
    }
}