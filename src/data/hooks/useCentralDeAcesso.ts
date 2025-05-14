import { useContext } from "react"
import CentralDeAcessoContext from "../contexts/CentralDeAcessoContext"

const useCentralDeAcesso = () => useContext(CentralDeAcessoContext)

export default useCentralDeAcesso