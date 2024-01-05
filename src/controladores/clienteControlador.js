import {API} from '../funcoes.js'

export async function listarPedidoCliente(req, res){
    const idCliente = req.params.id
    if(isNaN(parseInt(idCliente))) return res.status(404).json({status_code: 404, msg: 'Por favor, insira apenas número no endpoint'})

    await API(req.method, '???????????').then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText === "Internal Server Error" ? "Pedido do cliente não encontrado" : e.statusText
        })
    })
}