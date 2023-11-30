import express from 'express'
import categoriaRotas from "./rotas/categoriasRotas.js"
import subcategoriasRotas from "./rotas/subcategoriasRotas.js"
import error from "./rotas/error.js"
const server = express()

server.use(express.json())
server.use(categoriaRotas)
server.use(subcategoriasRotas)
server.use(error)

server.listen(3000, () => {
    console.log(`Status: \u001b[0;32mServidor Iniciado\u001b[0m | Porta: \u001b[0;34m${3000}\u001b[0m`)
})