import {API} from '../funcoes.js'

export async function obterItensVendas(req, res){
    await API(req.method, 'listar_itens_venda/').then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.sort((a, b) => a.id_item_venda - b.id_item_venda)
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText
        })
    })
}

export async function obterItemVenda(req, res){
    const id_item_comprado = req.params.id
    if(isNaN(parseInt(id_item_comprado))) return res.status(404).json({status_code: 404, msg: 'Tipo de dado não permitido'})
    await API(req.method, `listar_item_venda/${id_item_comprado}`).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText === "Internal Server Error" ? "Item venda não encontrado" : e.statusText
        })
    })
}