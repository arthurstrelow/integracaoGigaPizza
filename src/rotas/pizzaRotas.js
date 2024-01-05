import express from 'express'
import * as pizzaControlador from '../controladores/pizzaControlador.js'
const rotas = express.Router()

rotas
    .route('/listar/pizza/:id')
    .get(pizzaControlador.listarPizza)

rotas
    .route('/listar/pizzapedido/:id')
    .get(pizzaControlador.listarPizzaPedido)

export default rotas