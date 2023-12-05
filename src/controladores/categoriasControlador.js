import {API} from '../funcoes.js'
export async function obterCategorias(req, res){
    await API(req.method, 'listar_categorias/').then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.sort((a,b) => a.id_categoria - b.id_categoria)
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText
        })
    })
}

export async function obterCategoria(req, res){
    const id_categoria = req.params.id
    if(isNaN(parseInt(id_categoria))) return res.status(404).json({status_code: 404, msg: 'Por favor, insira apenas números no campo "id_categoria"'})
    await API(req.method, `listar_categoria/${id_categoria}`).then((result) => {
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
    const dados = await API('get', `listar_categoria/${id_categoria}`).then(r => r.data).catch(e => e.status_code)

    if(dados.hasOwnProperty('is_active') && dados.is_active) return res.status(200).json({status_code: 200, msg: `A categoria "${dados.nome_categoria}" já está ativada`})
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `A categoria não foi encontrada`})

    await API(req.method, `ativar_categoria/`, {
        "id_categoria": id_categoria
    }).then(async (result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? `A categoria "${dados.nome_categoria}" foi ativada` : result.data
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
    const dados = await API('get', `listar_categoria/${id_categoria}`).then(r => r.data).catch(e => e.status_code)

    if(dados.hasOwnProperty('is_active') && !dados.is_active) return res.status(200).json({status_code: 200, msg: `A categoria "${dados.nome_categoria}" já está inativada`})
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `A categoria não foi encontrada`})

    await API(req.method, `inativar_categoria/`, {
        "id_categoria": id_categoria
    }).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? `A categoria "${dados.nome_categoria}" foi inativada` : result.data
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
        "nome_categoria": nome_categoria.trim()
    }).then((result) => {
            const resultado = result.data.resultado;
            const verificaoDeNaoExistencia = resultado !== 0 // True: Não Existe; False: Existe

            const retorno = {
                status_code: verificaoDeNaoExistencia ? 200 : 400,
                msg: verificaoDeNaoExistencia ? `Categoria cadastrada com sucesso.` : 'Existe uma categoria com esse nome.'
            }

            res.status(retorno.status_code).json({
                status_code: retorno.status_code,
                msg: retorno.msg,
                ...(verificaoDeNaoExistencia && {id_categoria: resultado})
            });
        }).catch((error) => {
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
        "nome_categoria": nome_categoria.trim()
        }).then((result) => {
            const resultado = result.data.resultado;
            const verificaoDeNaoExistencia = resultado !== 0 // True: Não Existe; False: Existe

            const retorno = {
                status_code: verificaoDeNaoExistencia ? 200 : 400,
                msg: verificaoDeNaoExistencia ? `Categoria editada com sucesso` : 'Nome da categoria já existe'
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