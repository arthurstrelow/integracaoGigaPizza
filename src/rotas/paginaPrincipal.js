import express from 'express'
import {obterRotas} from "../controladores/paginaPrincipalControlador.js";
const rotas = express.Router()

rotas
    .route('/')
    .get(obterRotas)

export default rotas