import express from 'express'

const server = express()
const porta = 8000
server.listen(porta, () => {
    console.log(`Status: \u001b[0;32mServidor Iniciado\u001b[0m | Porta: \u001b[0;34m${porta}\u001b[0m`)
})