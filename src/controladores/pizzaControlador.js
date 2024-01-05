import {API} from '../funcoes.js'

export async function listarPizza(req, res){
    const idPizza = req.params.id
    if(isNaN(parseInt(idPizza))) return res.status(404).json({status_code: 404, msg: 'Por favor, insira apenas número no endpoint'})

    await API(req.method, `listar_pizza/${idPizza}`).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText === "Internal Server Error" ? "Pizza não encontrado" : e.statusText
        })
    })
}

export async function listarPizzaPedido(req, res){
    const idPizza = req.params.id
    if(isNaN(parseInt(idPizza))) return res.status(404).json({status_code: 404, msg: 'Por favor, insira apenas número no endpoint'})

    await API(req.method, `?????????w`).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText === "Internal Server Error" ? "Pedido da Pizza não encontrado" : e.statusText
        })
    })
}

export async function criarSaborPizza(req, res) {
    const { pizza_id, itemvenda_id } = req.body;

    await API(req.method, 'criar_sabor_pizza/', {
        "pizza_id": pizza_id,
        "itemvenda_id": itemvenda_id,
    }).then((result) => {
        const resultado = result.data.resultado;
        const verificacaoDeNaoExistencia = resultado !== 0; // True: Não Existe; False: Existe

        const retorno = {
            status_code: verificacaoDeNaoExistencia ? 200 : 400,
            msg: verificacaoDeNaoExistencia ? `Sabor cadastrado com sucesso.` : 'Já existe um sabor com este nome.',
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg,
            ...(verificacaoDeNaoExistencia && { id_sabor_pizza: resultado })
        });
    }).catch((error) => {
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}


export async function criarPizza(req, res) {
    const { id_item_venda, tamanho_pizza } = req.body;

    await API(req.method, 'criar_pizza/', {
        "id_item_venda": id_item_venda,
        "tamanho_pizza": tamanho_pizza.trim()
    }).then((result) => {
        const resultado = result.data.resultado;
        const verificacaoDeNaoExistencia = resultado !== 0; // True: Não Existe; False: Existe

        const retorno = {
            status_code: verificacaoDeNaoExistencia ? 200 : 400,
            msg: verificacaoDeNaoExistencia ? `Pizza cadastrada com sucesso.` : 'Houve um erro.',
        }

        res.status(retorno.status_code).json({
            status_code: retorno.status_code,
            msg: retorno.msg,
            ...(verificacaoDeNaoExistencia && { id_pizza: resultado })
        });
    }).catch((error) => {
        res.status(error.status_code).json({
            status_code: error.status_code,
            msg: error.statusText
        });
    });
}