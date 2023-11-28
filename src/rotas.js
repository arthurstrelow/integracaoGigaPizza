import express from 'express'
import axios from 'axios'
import {Router} from 'express'

const rotas = Router()

rotas.get('/', async (req, res) => {
    res.status(200).json({
        status: 200,
        msg: 'Página Inicial!'
    })
})

export default rotas