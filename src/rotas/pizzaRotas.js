import express from 'express'
import * as pizzaControlador from '../controladores/pizzaControlador.js'
const rotas = express.Router()

rotas
    .route('/listar/pizza/:id')
    .get(pizzaControlador.listarPizza)

rotas
    .route('/listar/pizzapedido/:id')
    .get(pizzaControlador.listarPizzaPedido)

rotas
    .route('/cadastrar/saborpizza')
    .get(pizzaControlador.criarSaborPizza)

rotas
    .route('/cadastrar/pizza')
    .get(pizzaControlador.criarPizza)

export default rotas