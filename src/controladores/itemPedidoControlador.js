import {API} from '../funcoes.js'

export async function obterPedidos(req, res){
    await API(req.method, 'listar_pedidos/').then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.sort((a,b) => {
                if(a.id_pedido < b.id_pedido) return -1
                //if(a.id_pedido > b.id_pedido) return 1
                return 1
            })
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText
        })
    })
}


export async function obterPedido(req, res){
    const pedido = req.params.id
    if(isNaN(parseInt(pedido))) return res.status(404).json({status_code: 404, msg: 'Por favor, insira apenas número no endpoint'})
    await API(req.method, `listar_pedido/${pedido}`).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText === "Internal Server Error" ? "Pedido não encontrado" : e.statusText
        })
    })
}


export async function obterPedidoCliente(req, res){
    const pedidoCliente = req.params.id
    if(isNaN(parseInt(pedidoCliente))) return res.status(404).json({status_code: 404, msg: 'Por favor, insira apenas número no endpoint'})
    await API(req.method, `listar_pedido_cliente/${pedidoCliente}`).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText === "Internal Server Error" ? "Pedido não encontrado" : e.statusText
        })
    })
}


export async function cadastrarPedido(req, res){
    const {hora_entrega, descricao_pedido, id_usuario_requisitante, id_usuario_pedido} = req.body

    await API(req.method, 'criar_pedido/', {
        "hora_entrega": hora_entrega,
        "descricao_pedido": descricao_pedido,
        "id_usuario_requisitante": id_usuario_requisitante,
        "id_usuario_pedido": id_usuario_pedido
    }).then((result) => {
        const resultado = result.data.resultado;

        if(resultado === -5) return res.status(400).json({status_code: 400,msg: 'ID do Usuário não informado' })

        const verificaoDeNaoExistencia = resultado !== 0 // True: Não Existe; False: Existe
        const retorno = {
            status_code: verificaoDeNaoExistencia ? 200 : 400,
            msg: verificaoDeNaoExistencia ? `Pedido cadastrado com sucesso.` : 'Houve um erro ao cadastrar o pedido'
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg,
            ...(verificaoDeNaoExistencia && {id_pedido: resultado})
        });
    }).catch((error) => {
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}


export async function editarPedido(req, res){
    const {id_pedido, hora_entrega, descricao_pedido, id_usuario_requisitante} = req.body

    const dados = await API('get', `listar_pedido/${id_pedido}`).then(r => r.data).catch(e => e.status_code)
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `O pedido não foi encontrado`})

    await API(req.method, 'editar_categoria/', {
        "id_pedido": id_pedido,
        "hora_entrega": hora_entrega,
        "descricao_pedido": descricao_pedido,
        "id_usuario_requisitante": id_usuario_requisitante
    }).then((result) => {
        const resultado = result.data.resultado

        if(resultado === -5) return res.status(400).json({status_code: 400,msg: 'ID do Usuário não informado' })

        const verificaoDeNaoExistencia = resultado !== 0 // True: Não Existe; False: Existe
        const retorno = {
            status_code: verificaoDeNaoExistencia ? 200 : 400,
            msg: verificaoDeNaoExistencia ? `Pedido editado com sucesso.` : 'Houve um erro ao editar o pedido.'
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg
        });
    }).catch((error) => {
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}

export async function criarItemPedido(req, res){
    const {valor, quantidade, item_venda_id} = req.body

    await API(req.method, 'criar_item_pedido/', {
        "valor": valor,
        "quantidade": quantidade,
        "item_venda_id": item_venda_id,
    }).then((result) => {
        const resultado = result.data.resultado;

        if(resultado === -5) return res.status(400).json({status_code: 400,msg: 'ID do Usuário não informado' })

        const verificaoDeNaoExistencia = resultado !== 0 // True: Não Existe; False: Existe
        const retorno = {
            status_code: verificaoDeNaoExistencia ? 200 : 400,
            msg: verificaoDeNaoExistencia ? `Item Pedido criado com sucesso` : 'Houve um erro ao criar item Pedido'
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg,
            ...(verificaoDeNaoExistencia && {id_pedido: resultado})
        });
    }).catch((error) => {
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}


export async function criarPizzaPedido(req, res){
    const {pedido_id, pizza_id} = req.body

    await API(req.method, 'criar_item_pedido/', {
        "pedido_id": pedido_id,
        "pizza_id": pizza_id,
    }).then((result) => {
        const resultado = result.data.resultado;

        if(resultado === -5) return res.status(400).json({status_code: 400,msg: 'ID do Usuário não informado' })

        const verificaoDeNaoExistencia = resultado !== 0 // True: Não Existe; False: Existe
        const retorno = {
            status_code: verificaoDeNaoExistencia ? 200 : 400,
            msg: verificaoDeNaoExistencia ? `Pizza Pedido criado com sucesso` : 'Houve um erro ao criar pizza Pedido'
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg,
            ...(verificaoDeNaoExistencia && {id_pizza_pedido: resultado})
        });
    }).catch((error) => {
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}