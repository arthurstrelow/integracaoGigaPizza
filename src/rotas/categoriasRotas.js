import express from 'express'
import * as categoriaControlador from '../controladores/categoriasControlador.js'
const rotas = express.Router()

rotas
    .route('/listar/categorias')
    .get(categoriaControlador.obterCategorias)

rotas
    .route('/listar/categoria/:id')
    .get(categoriaControlador.obterCategoria)

rotas
    .route('/ativar/categoria')
    .post(categoriaControlador.ativarCategoria)

rotas
    .route('/inativar/categoria')
    .post(categoriaControlador.inativarCategoria)

rotas
    .route('/cadastrar/categoria')
    .post(categoriaControlador.cadastrarCategoria)

rotas
    .route('/editar/categoria')
    .post(categoriaControlador.editarCategoria)



export default rotas