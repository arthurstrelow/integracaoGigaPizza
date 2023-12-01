import {API} from '../funcoes.js'

export async function obterSubcategorias(req, res){
    await API(req.method, 'listar_subcategorias/').then((result) => {
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

export async function obterSubcategoria(req, res){
    await API(req.method, `listar_subcategoria/${req.params.id}`).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText === "Internal Server Error" ? "Subcategoria não encontrada" : e.statusText
        })
    })
}

export async function ativarSubcategoria(req, res){
    const {id_subcategoria} = req.body
    const verificao = (await API('get', `listar_subcategoria/${id_subcategoria}`)).data.is_active
    if(verificao) return res.status(200).json({status_code: 200, msg: "Subcategoria já está ativada"})
    await API(req.method, `ativar_subcategoria/`, {
        "id_subcategoria": id_subcategoria
    }).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? "Subcategoria Ativada" : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function inativarSubcategoria(req, res){
    const {id_subcategoria} = req.body
    const verificao = (await API('get', `listar_subcategoria/${id_subcategoria}`)).data.is_active
    if(!verificao) return res.status(200).json({status_code: 200, msg: "Subcategoria já está inativada"})
    await API(req.method, `inativar_subcategoria/`, {
        "id_subcategoria": id_subcategoria
    }).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? "Subcategoria Inativada" : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function cadastrarSubcategoria(req, res){
    const { id_categoria, nome_subcategoria } = req.body;

    await API(req.method, 'cadastrar_subcategoria/', {
        "id_categoria": id_categoria,
        "nome_subcategoria": nome_subcategoria
    })
        .then((result) => {
            const resultado = result.data.resultado;

            res.status(result.status_code).json({
                status_code: result.status_code,
                msg: resultado !== undefined && resultado !== 0
                    ? `Subcategoria cadastrada com sucesso. ID: ${resultado}`
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

export async function editarSubcategoria(req, res){
    const { id_subcategoria, id_categoria, nome_subcategoria } = req.body;

    await API(req.method, 'cadastrar_subcategoria/', {
        "id_subcategoria": id_subcategoria,
        "id_categoria": id_categoria,
        "nome_subcategoria": nome_subcategoria
    }).then((result) => {
            const resultado = result.data.resultado;
            res.status(result.status_code).json({
                status_code: result.status_code,
                msg: resultado !== undefined && resultado !== 0 ? `Subcategoria editada` : 'Subcategoria já cadastrada.'
            })
        }).catch((error) => {
            res.status(error.status_code).json({
                status_code: error.status_code,
                msg: error.statusText
            });
        });
}