import express from 'express'
import * as itemPedidoControlador from '../controladores/itemPedidoControlador.js'
import {criarItemPedido, criarPizzaPedido} from "../controladores/itemPedidoControlador.js";
const rotas = express.Router()


rotas
    .route('/listar/pedidos')
    .get(itemPedidoControlador.obterPedidos)

rotas
    .route('/listar/pedido/:id')
    .get(itemPedidoControlador.obterPedido)

rotas
    .route('/listar/pedidocliente/:id')
    .get(itemPedidoControlador.obterPedidoCliente)

rotas
    .route('/cadastrar/pedido')
    .post(itemPedidoControlador.cadastrarPedido)

rotas
    .route('/editar/pedido')
    .post(itemPedidoControlador.editarPedido)

rotas
    .route('/cadastrar/itempedido')
    .post(itemPedidoControlador.criarItemPedido)

rotas
    .route('/cadastrar/pizzapedido')
    .post(itemPedidoControlador.criarPizzaPedido)

export default rotas