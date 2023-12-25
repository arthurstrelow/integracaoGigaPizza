import {API} from '../funcoes.js'

export async function obterItensVendas(req, res){
    await API(req.method, 'listar_itens_venda/').then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.sort((a,b) => {
                if(a.is_active === b.is_active) return a.id_item_venda - b.id_item_venda
                return a.is_active ? -1 : 1
            })
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

export async function ativarItemVenda(req, res){
    const {id_item_venda} = req.body
    const dados = await API('get', `listar_item_venda/${id_item_venda}`).then(r => r.data).catch(e => e.status_code)

    if(dados.hasOwnProperty('is_active') && dados.is_active) return res.status(200).json({status_code: 200, msg: `O item "${dados.nome_item_venda}" já está ativado`})
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `O Item não foi encontrado`})

    await API(req.method, `ativar_item_venda/`, {
        "id_item_venda": id_item_venda
    }).then(async (result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? `O item ${dados.nome_item_venda} foi ativado com sucesso` : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function inativarItemVenda(req, res) {
    const {id_item_venda} = req.body
    const dados = await API('get', `listar_item_venda/${id_item_venda}`).then(r => r.data).catch(e => e.status_code)

    if (dados.hasOwnProperty('is_active') && !dados.is_active) return res.status(200).json({
        status_code: 200,
        msg: `O item "${dados.nome_item_venda}" já está inativado`
    })
    if (dados === 500) return res.status(404).json({status_code: 404, msg: `O Item não foi encontrado`})

    await API(req.method, `inativar_item_venda/`, {
        "id_item_venda": id_item_venda
    }).then(async (result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? `O item "${dados.nome_item_venda}" foi inativado com sucesso` : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function criarItemVenda(req, res) {
    const { nome_item_venda, descricao_item_venda, preco_item_venda, id_subcategoria,id_usuario_requisitante } = req.body;

    await API(req.method, 'criar_item_venda/', {
        "nome_item_venda": nome_item_venda.trim(),
        "descricao_item_venda": descricao_item_venda.trim(),
        "preco_item_venda": preco_item_venda,
        "id_subcategoria": id_subcategoria,
        "id_usuario_requisitante": id_usuario_requisitante
    }).then((result) => {
        const resultado = result.data.resultado;
        const verificacaoDeNaoExistencia = resultado !== 0; // True: Não Existe; False: Existe

        if(result.data.resultado === -5) return res.status(400).json({status_code: 400,msg: 'ID do Usuário não informado' })

        const retorno = {
            status_code: verificacaoDeNaoExistencia ? 200 : 400,
            msg: verificacaoDeNaoExistencia ? 'Item de venda cadastrado com sucesso.' : 'Já existe um item de venda com este nome.',
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg,
            ...(verificacaoDeNaoExistencia && { id_item_venda: resultado })
        });
    }).catch((error) => {
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}

export async function editarItemVenda(req, res) {
    const { id_item_venda, nome_item_venda, descricao_item_venda, preco_item_venda, id_usuario_requisitante } = req.body;

    await API(req.method, 'editar_item_venda/', {
        "id_item_venda": id_item_venda,
        "nome_item_venda": nome_item_venda,
        "descricao_item_venda": descricao_item_venda,
        "preco_item_venda": preco_item_venda,
        "id_usuario_requisitante": id_usuario_requisitante
    }).then((result) => {
        const resultado = result.data.resultado;
        const verificacaoDeNaoExistencia = resultado !== 0;

        if(result.data.resultado === -5) return res.status(400).json({status_code: 400,msg: 'ID do Usuário não informado' })

        const retorno = {
            status_code: verificacaoDeNaoExistencia ? 200 : 400,
            msg: verificacaoDeNaoExistencia ? 'Item de venda editado com sucesso.' : 'Já existe um item de venda com este nome.',
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg
        });
    }).catch((error) => {
        console.log(error)
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}