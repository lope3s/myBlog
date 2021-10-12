import { client } from '../db'

/**
 * Verifica pelo email passado se o usuário já existe no banco.
 * Caso receba userName deve receber uma projeção dos campos a serem retornados da filtragem, é utilizado em uma filtragem dupla.
 * Retorna os dados encontrados pela filtragem.
 */

const checkUserAlreadyExist = async (email: string, userName?: string, projection?: object) => {
    const db = client.db();

    if (projection){
        const matchData = db
        .collection('users')
        .aggregate([
            {$match: {$or: [{email}, {userName}]}},
            {$project: projection}
        ])
        .toArray()
        .then(res => res)
        .catch(err => {
            throw new Error(err as any)
        })
        
        return matchData
    }
    
    const matchData = db
    .collection("users")
    .find({email})
    .toArray()
    .then(res => res)
    .catch(err => {
        throw new Error(err as any)
    })

    return matchData

}

export default checkUserAlreadyExist