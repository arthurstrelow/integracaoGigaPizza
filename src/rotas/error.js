import express from 'express'
const rotas = express.Router()

rotas.use((req, res) => {
    res.status(404).json({
        status_code: 404,
        msg: 'rota inexistente'
    })
})

export default rotas