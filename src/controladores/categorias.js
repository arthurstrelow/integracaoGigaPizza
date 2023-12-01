import {API} from '../funcoes.js'
export async function obterCategorias(req, res){
    await API(req.method, 'listar_categorias/').then((result) => {
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

export async function obterCategoria(req, res){
    await API(req.method, `listar_categoria/${req.params.id}`).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText === "Internal Server Error" ? "Categoria não encontrada" : e.statusText
        })
    })
}

export async function ativarCategoria(req, res){
    const {id_categoria} = req.body
    const verificao = (await API('get', `listar_categoria/${id_categoria}`)).data.is_active
    if(verificao) return res.status(200).json({status_code: 200, msg: "Categoria já está ativada"})
    await API(req.method, `ativar_categoria/`, {
        "id_categoria": id_categoria
    }).then(async (result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? "Categoria ativada" : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function inativarCategoria(req, res){
    const {id_categoria} = req.body
    const verificao = (await API('get', `listar_categoria/${id_categoria}`)).data.is_active
    if(!verificao) return res.status(200).json({status_code: 200, msg: "Categoria já está inativada"})
    await API(req.method, `inativar_categoria/`, {
        "id_categoria": id_categoria
    }).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? "Categoria Inativada" : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function cadastrarCategoria(req, res){
    const { nome_categoria } = req.body;

    await API(req.method, 'cadastrar_categoria/', {
        "nome_categoria": nome_categoria
    }).then((result) => {
            const resultado = result.data.resultado;

            res.status(result.status_code).json({
                status_code: result.status_code,
                msg: resultado !== undefined && resultado !== 0
                    ? `Categoria cadastrada com sucesso. ID: ${resultado}`
                    : 'Nome já cadastrado.'
            });
        })
        .catch((error) => {
            res.status(error.status_code).json({
                status_code: error.status_code,
                msg: error.statusText
            });
        });
}

export async function editarCategoria(req, res){
    const { id_categoria, nome_categoria } = req.body;

    await API(req.method, 'editar_categoria/', {
        "id_categoria": id_categoria,
        "nome_categoria": nome_categoria
        }).then((result) => {
            const resultado = result.data.resultado;
            res.status(result.status_code).json({
                status_code: result.status_code,
                msg: resultado !== undefined && resultado !== 0 ? `Categoria editada` : 'Categoria já cadastrada.'
            });
        }).catch((error) => {
            res.status(error.status_code).json({
                status_code: error.status_code,
                msg: error.statusText
            });
        });
}