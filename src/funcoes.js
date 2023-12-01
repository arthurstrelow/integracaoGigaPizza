import axios from 'axios'
import fs from "fs";
import path, {dirname} from "path";
import {fileURLToPath} from 'url'

export async function API(metodo, endpoint, data = false){
    return new Promise(async (resolve, reject) => {
        try{
            const api = await axios({
                method: metodo,
                url: 'https://gigapizza.onrender.com/api/maingigapizza/' + endpoint,
                headers: {"Content-Type": "application/json"},
                data: data
            })
            resolve({
                status_code: api.status,
                statusText: api.statusText,
                method: api.config.method,
                url: api.config.url,
                data: api.data
            })
        }catch (e){
            reject({
                status_code: e.response.status,
                statusText: e.response.statusText,
                method: e.config.method,
                url: e.config.url,
                data: e.response.data
            })
        }
    })
}


export async function listarRotas(){
    return new Promise(async (resolve, reject) => {
        const diretorio = dirname(fileURLToPath(import.meta.url)) + '/rotas'
        const rota = []
        const metodo = []
        fs.readdir(diretorio, (err, arquivos) => {
            if (err) {
                reject(JSON.stringify("Não foi possível listar as rotas"))
            }
            arquivos.forEach((arquivo) => {
                const caminhoCompleto = path.join(diretorio, arquivo)
                try{
                    const data = fs.readFileSync(caminhoCompleto, 'utf-8')
                    const explode = data.split('\n')
                    explode.forEach((i) => {
                        const regexRota = i.match(/\.route\(['"]([^'"]+)['"]\)/)
                        const regexMetodo = i.match( /\.(\b(?:get|post)\b)/g)
                        if(regexRota) rota.push(regexRota[1])
                        if(regexMetodo) metodo.push(regexMetodo[0].replace('.', ''))
                    })
                } catch (e){
                    reject(JSON.stringify("Não foi possível listar as rotas"))
                }
            })
            const final = {rota, metodo}
            resolve(final.rota.map((caminho, index) => ({
                caminho,
                metodo: final.metodo[index],
            })))
        })
    })
}