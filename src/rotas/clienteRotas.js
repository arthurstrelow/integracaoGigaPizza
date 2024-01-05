import express from 'express'
import * as clienteControlador from '../controladores/clienteControlador.js'
const rotas = express.Router()

rotas
    .route('/listar/pedidocliente/:id')
    .get(clienteControlador.listarPedidoCliente)

export default rotas