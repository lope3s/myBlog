import { client } from '../db'

const checkUserAlreadyExist = async (email: string, userName: string, projection?: object) => {
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
    .find({email, userName})
    .toArray()
    .then(res => res)
    .catch(err => {
        throw new Error(err as any)
    })

    return matchData

}

export default checkUserAlreadyExist