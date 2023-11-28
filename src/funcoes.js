import axios from 'axios'

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