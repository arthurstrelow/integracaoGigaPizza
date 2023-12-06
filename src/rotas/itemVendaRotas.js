import express from 'express'
import * as itemVenda from '../controladores/itemVendaControlador.js'
const rotas = express.Router()

rotas
    .route('/listar/itensvendidos')
    .get(itemVenda.obterItensVendas)

rotas
    .route('/listar/itemvenda/:id')
    .get(itemVenda.obterItemVenda)

export default rotas