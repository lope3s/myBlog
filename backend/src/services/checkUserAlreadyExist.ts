import { client } from '../db'

/**
 * @param email Verifica pelo email passado se o usuário já existe no banco.
 * @param userName Caso receba userName deve receber uma projection também.
 * @param projection Parâmetro opcional utilizado para reduzir os campos retornados do banco, passar uma projection significa utilizar a função para verificar
 * tanto o email quando o userName
 * @returns Retorna os dados encontrados pela filtragem.
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