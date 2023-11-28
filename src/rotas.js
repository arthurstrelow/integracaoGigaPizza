import express from 'express'
import {Router} from 'express'
import {API} from './funcoes.js'
const rotas = Router()

rotas.get('/', async (req, res) => {
    res.status(200).json({
        status_code: 200,
        msg: 'Página Inicial!'
    })
})

export default rotas