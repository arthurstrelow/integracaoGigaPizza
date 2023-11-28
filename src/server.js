import express from 'express'
import cors from 'cors'
import rotas from './rotas.js'

const server = express()
const porta = 3000

server.use(express.json())
server.use(cors())

server.use('/', rotas)

server.listen(porta, () => {
    console.log(`Status: \u001b[0;32mServidor Iniciado\u001b[0m | Porta: \u001b[0;34m${porta}\u001b[0m`)
})