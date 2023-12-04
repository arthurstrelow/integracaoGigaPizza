import express from 'express'
import * as itemCompradoControlador from '../controladores/itemCompradoControlador.js'
const rotas = express.Router()

rotas
    .route('/listar/itenscomprados')
    .get(itemCompradoControlador.obterItensComprados)

rotas
    .route('/listar/itemcomprado/:id')
    .get(itemCompradoControlador.obterItemComprado)

rotas
    .route('/ativar/compra')
    .post(itemCompradoControlador.ativarCompra)

rotas
    .route('/inativar/compra')
    .post(itemCompradoControlador.inativarCompra)

rotas
    .route('/cadastrar/itemcomprado')
    .post(itemCompradoControlador.criaritemcomprado)

export default rotas