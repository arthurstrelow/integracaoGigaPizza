import express from 'express'
import cors from 'cors'
import itemVendaRotas from "./rotas/itemVendaRotas.js";
import itemCompradoRotas from "./rotas/itemCompradoRotas.js"
import categoriaRotas from "./rotas/categoriasRotas.js"
import subcategoriasRotas from "./rotas/subcategoriasRotas.js"
import error from "./rotas/error.js"
import paginaPrincipalRotas from "./rotas/paginaPrincipal.js"
import pizzaRotas from './rotas/pizzaRotas.js'
import itemPedidoRotas from './rotas/itemPedidoRotas.js'

const server = express()
const porta = 3000

server.use(cors())
server.use(express.json())


server.use(categoriaRotas)
server.use(subcategoriasRotas)
server.use(itemCompradoRotas)
server.use(itemVendaRotas)
server.use(pizzaRotas)
server.use(itemPedidoRotas)


server.use(paginaPrincipalRotas)
server.use(error)

server.listen(porta, () => {
    console.log(`Status: \u001b[0;32mServidor Iniciado\u001b[0m | Porta: \u001b[0;34m${porta}\u001b[0m`)
})
