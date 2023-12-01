import express from 'express'
import categoriaRotas from "./rotas/categoriasRotas.js"
import subcategoriasRotas from "./rotas/subcategoriasRotas.js"
import error from "./rotas/error.js"
import paginaPrincipalRotas from "./rotas/paginaPrincipal.js"

const server = express()
const porta = 3000

server.use(express.json())
server.use(paginaPrincipalRotas)
server.use(categoriaRotas)
server.use(subcategoriasRotas)
server.use(error)

server.listen(porta, () => {
    console.log(`Status: \u001b[0;32mServidor Iniciado\u001b[0m | Porta: \u001b[0;34m${porta}\u001b[0m`)
})