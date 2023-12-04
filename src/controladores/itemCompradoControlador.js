import {API} from '../funcoes.js'

export async function obterItensComprados(req, res){
    await API(req.method, 'listar_itens_comprados/').then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.sort((a, b) => a.id_item_comprado - b.id_item_comprado)
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText
        })
    })
}

export async function obterItemComprado(req, res){
    const id_item_comprado = req.params.id
    if(isNaN(parseInt(id_item_comprado))) return res.status(404).json({status_code: 404, msg: 'Por favor, insira apenas números no campo "id_item_comprado"'})
    await API(req.method, `listar_item_comprado/${id_item_comprado}`).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText
        })
    })
}

export async function ativarCompra(req, res){
    const {id_item_comprado} = req.body
    const dados = await API('get', `listar_item_comprado/${id_item_comprado}`).then(r => r.data).catch(e => e.status_code)

    if(dados.hasOwnProperty('is_active') && dados.is_active) return res.status(200).json({status_code: 200, msg: `O item "${dados.nome_item_comprado}" já está ativado`})
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `A categoria não foi encontrada`})

    await API(req.method, `ativar_item_comprado/`, {
        "id_item_comprado": id_item_comprado
    }).then(async (result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? `O item ${dados.nome_item_comprado} foi ativado com sucesso` : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function inativarCompra(req, res){
    const {id_item_comprado} = req.body
    const dados = await API('get', `listar_item_comprado/${id_item_comprado}`).then(r => r.data).catch(e => e.status_code)

    if(dados.hasOwnProperty('is_active') && !dados.is_active) return res.status(200).json({status_code: 200, msg: `O item "${dados.nome_item_comprado}" já está inativado`})
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `A categoria não foi encontrada`})

    await API(req.method, `inativar_item_comprado/`, {
        "id_item_comprado": id_item_comprado
    }).then(async (result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? `O item "${dados.nome_item_comprado}" foi inativado com sucesso` : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function criaritemcomprado(req, res) {
    const { nome_item_comprado, preco_item_comprado, quantidade_item_comprado, unidade_item_comprado } = req.body;

    await API(req.method, 'criar_item_comprado/', {
        "nome_item_comprado": nome_item_comprado.trim(),
        "preco_item_comprado": preco_item_comprado,
        "quantidade_item_comprado": quantidade_item_comprado,
        "unidade_item_comprado": unidade_item_comprado.trim()
    }).then((result) => {
        const resultado = result.data.resultado;
        const verificacaoDeNaoExistencia = resultado !== 0; // True: Não Existe; False: Existe

        const retorno = {
            status_code: verificacaoDeNaoExistencia ? 200 : 400,
            msg: verificacaoDeNaoExistencia ? `Item comprado cadastrado com sucesso.` : 'Já existe um item comprado com este nome.',
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg,
            ...(verificacaoDeNaoExistencia && { id_item_comprado: resultado })
        });
    }).catch((error) => {
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}