import {listarRotas} from '../funcoes.js'

export async function obterRotas(req, res){
    res.status(200).json({
        status_code: 200,
        rotas: await listarRotas()
    })
}