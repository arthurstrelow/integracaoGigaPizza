import express from 'express'
import {Router} from 'express'
import {API} from './funcoes.js'
const rotas = Router()

/* Rota Página Principal */
rotas.get('/', async (req, res) => {
    res.status(200).json({
        status_code: 200,
        msg: 'Página Inicial!'
    })
})



/* Rotas listar (sub)categoria(s) */
rotas.get('/listar/categorias', async (req, res) => {
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
})


rotas.get('/listar/categoria/:id', async(req, res) => {
    await API(req.method, `listar_categoria/${req.params.id}`).then((result) => {
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
})


rotas.get('/listar/sub-categorias', async (req, res) => {
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
})


rotas.get('/listar/sub-categoria/:id', async (req, res) => {
    await API(req.method, `listar_subcategoria/${req.params.id}`).then((result) => {
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
})



/* Rotas (IN)ativar (sub)categorias */
rotas.post('/ativar/categoria', async (req, res) => {
    const {id_categoria} = req.body
    await API(req.method, `ativar_categoria/`, {
        "id_categoria": id_categoria
    }).then((result) => {
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
})


rotas.post('/ativar/sub-categoria', async(req, res) => {
    const {id_subcategoria} = req.body
    await API(req.method, `ativar_subcategoria/`,{
        "id_subcategoria": id_subcategoria
    }).then((result) => {
        res.status(result.status_code).json({
            status_code: result.status_code,
            msg: result.data.resultado === 'ok' ? "Subcategoria ativada" : result.data
        })
    }).catch((e) => {
        res.status(e.status_code).json({
            status_code: e.status_code,
            msg: e.data.erro
        })
    })
})


rotas.post('/inativar/categoria', async (req, res) => {
    const {id_categoria} = req.body
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
})


rotas.post('/inativar/sub-categoria', async (req, res) => {
    const {id_subcategoria} = req.body
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
})



/* Rotas para cadastrar (sub)categoria */
rotas.post('/cadastrar/categoria', async (req, res) => {
    const { nome_categoria } = req.body;

    await API(req.method, 'cadastrar_categoria/', {
        "nome_categoria": nome_categoria
    })
    .then((result) => {
        const resultado = result.data.resultado;

        res.status(200).json({
            status_code: 200,
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
});


rotas.post('/cadastrar/subcategoria', async (req, res) => {
    const { id_categoria, nome_subcategoria } = req.body;

    await API(req.method, 'cadastrar_subcategoria/', {
        "id_categoria": id_categoria,
        "nome_subcategoria": nome_subcategoria
    })
    .then((result) => {
        const resultado = result.data.resultado;

        res.status(200).json({
            status_code: 200,
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
});
export default rotas
