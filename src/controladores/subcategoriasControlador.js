import {API} from '../funcoes.js'

export async function obterSubcategorias(req, res){
    await API(req.method, 'listar_subcategorias/').then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.sort((a,b) => {
                if (a.is_active !== b.is_active) return a.is_active ? -1 : 1
                if (a.id_categoria !== b.id_categoria) return a.id_categoria - b.id_categoria
                return a.id_subcategoria - b.id_subcategoria
            })
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.statusText
        })
    })
}

export async function obterSubcategoria(req, res){
    const id_subcategoria = req.params.id
    if(isNaN(parseInt(id_subcategoria))) return res.status(404).json({status_code: 404, msg: 'Tipo de dado não permitido'})
    await API(req.method, `listar_subcategoria/${id_subcategoria}`).then((result) => {
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
    const dados = await API('get', `listar_subcategoria/${id_subcategoria}`).then(r => r.data).catch(e => e.status_code)

    if(dados.hasOwnProperty('is_active') && dados.is_active) return res.status(200).json({status_code: 200, msg: `A subcategoria "${dados.nome_subcategoria}" já está ativada`})
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `A subcategoria não foi encontrada`})

    await API(req.method, `ativar_subcategoria/`, {
        "id_subcategoria": id_subcategoria
    }).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? `A subcategoria "${dados.nome_subcategoria}" foi ativada` : result.data
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
    const dados = await API('get', `listar_subcategoria/${id_subcategoria}`).then(r => r.data).catch(e => e.status_code)

    if(dados.hasOwnProperty('is_active') && !dados.is_active) return res.status(200).json({status_code: 200, msg: `A subcategoria "${dados.nome_subcategoria}" já está inativada`})
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `A subcategoria não foi encontrada`})

    await API(req.method, `inativar_subcategoria/`, {
        "id_subcategoria": id_subcategoria
    }).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? `A subcategoria "${dados.nome_subcategoria}" foi inativada` : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
}

export async function cadastrarSubcategoria(req, res){
    const { id_categoria, nome_subcategoria, id_usuario_requisitante } = req.body;

    await API(req.method, 'cadastrar_subcategoria/', {
        "id_categoria": id_categoria,
        "nome_subcategoria": nome_subcategoria.trim(),
        "id_usuario_requisitante": id_usuario_requisitante
    }).then((result) => {
            const resultado = result.data.resultado;
            const verificaoDeNaoExistencia = resultado !== 0 // True: Não Existe; False: Existe

            if(resultado === -5) return res.status(400).json({status_code: 400,msg: 'ID do Usuário não informado' })

            const retorno = {
                status_code: verificaoDeNaoExistencia ? 200 : 400,
                msg: verificaoDeNaoExistencia ? `Subcategoria cadastrada com sucesso.` : 'Nome de subcategoria já existente'
            }

            res.status(retorno.status_code).json({
                status_code: retorno.status_code,
                msg: retorno.msg,
                ...(verificaoDeNaoExistencia && {id_subcategoria: resultado})
            });

        }).catch((error) => {
            res.status(error.status_code).json({
                status_code: error.status_code,
                msg: error.statusText
            });
        });
}

export async function editarSubcategoria(req, res){
    const { id_subcategoria, id_categoria, nome_subcategoria, id_usuario_requisitante } = req.body;

    const dados = await API('get', `listar_subcategoria/${id_subcategoria}`).then(r => r.data).catch(e => e.status_code)
    if(dados === 500) return res.status(404).json({status_code: 404, msg: `A subcategoria não foi encontrada`})

    await API(req.method, 'editar_subcategoria/', {
        "id_subcategoria": id_subcategoria,
        "id_categoria": id_categoria,
        "nome_subcategoria": nome_subcategoria,
        "id_usuario_requisitante": id_usuario_requisitante
    }).then((result) => {
            const resultado = result.data.resultado;
            const verificaoDeNaoExistencia = resultado !== 0 // True: Não Existe; False: Existe

            if(resultado === -5) return res.status(400).json({status_code: 400,msg: 'ID do Usuário não informado' })

            const retorno = {
                status_code: verificaoDeNaoExistencia ? 200 : 400,
                msg: verificaoDeNaoExistencia ? `Subcategoria editada` : 'Já existe uma Subcategoria com esse nome'
            }

            res.status(retorno.status_code).json({
                status_code: retorno.status_code,
                msg: retorno.msg
            })
        }).catch((error) => {
            res.status(error.status_code).json({
                status_code: error.status_code,
                msg: error.statusText
            });
        });
}