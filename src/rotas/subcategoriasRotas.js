import express from 'express'
import * as subcategoriaControlador from '../controladores/subcategoriasControlador.js'
const rotas = express.Router()

rotas
    .route('/listar/subcategorias')
    .get(subcategoriaControlador.obterSubcategorias)

rotas
    .route('/listar/subcategoria/:id')
    .get(subcategoriaControlador.obterSubcategoria)

rotas
    .route('/ativar/subcategoria')
    .post(subcategoriaControlador.ativarSubcategoria)

rotas
    .route('/inativar/subcategoria')
    .post(subcategoriaControlador.inativarSubcategoria)

rotas
    .route('/cadastrar/subcategoria')
    .post(subcategoriaControlador.cadastrarSubcategoria)

rotas
    .route('/editar/subcategoria')
    .post(subcategoriaControlador.editarSubcategoria)

export default rotas