import express from 'express'
import * as itemVenda from '../controladores/itemVendaControlador.js'
const rotas = express.Router()

rotas
    .route('/listar/itensvendidos')
    .get(itemVenda.obterItensVendas)

rotas
    .route('/listar/itemvendido/:id')
    .get(itemVenda.obterItemVenda)

rotas
    .route('/ativar/venda')
    .post(itemVenda.ativarItemVenda)

rotas
    .route('/inativar/venda')
    .post(itemVenda.inativarItemVenda)

rotas
    .route('/cadastrar/itemvenda')
    .post(itemVenda.criarItemVenda)

rotas
    .route('/editar/itemvenda')
    .post(itemVenda.editarItemVenda)

export default rotas