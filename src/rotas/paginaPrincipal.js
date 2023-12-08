import express from 'express'
import {listarRotas} from '../funcoes.js'
const rotas = express.Router()

rotas
    .route('/')
    .get(async (req, res) => {
        res.status(200).json({
            status_code: 200,
            rotas: await listarRotas()
        })
    })

export default rotas