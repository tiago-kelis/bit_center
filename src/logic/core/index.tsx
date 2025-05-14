import ServicosFinancas from "./financas/ServicosFinancas"
import ServicosUsuario from "./usuario/ServicosUsuario"

class Servicos {
    get financas() { return new ServicosFinancas() }
    get usuario() { return new ServicosUsuario() }
}

const servicos = new Servicos()
export default servicos