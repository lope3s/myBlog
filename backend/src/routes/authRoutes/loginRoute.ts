import express, {Request, Response} from 'express';
import { client } from '../../db';
import { checkFields } from '../../middlewares/checkFields';
import checkUserAlreadyExist from '../../services/checkUserAlreadyExist';
import createPassHash from '../../services/createPassHash';
import jwt from 'jsonwebtoken';

import { ILogin } from '../../Types/ILogin';
import { ObjectId } from 'mongodb';

const db = client.db()
const loginRoute = express.Router()

loginRoute.post('/login', checkFields(['email', 'password']), async(req: Request<any, any, ILogin>, res: Response) => {
    try {
        const { email, password } = req.body

        const checkUser = await checkUserAlreadyExist(email)

        if (!checkUser.length){
            return res.status(404).send({message: "Usuário não encontrado"}).end()
        }

        const matchedUser = await db
        .collection('users')
        .aggregate([
            {$match: {email, password: createPassHash(password)}}, 
            {$project: {userName: 1, isLogged: 1, email: 1}}
        ])
        .toArray()

        if (!matchedUser.length){
            return res.status(400).send({message: "Dados de acesso inválidos"}).end()
        }

        const token = jwt.sign(matchedUser[0], String(process.env.HASH_TOKEN_DATA), {expiresIn: '30m'})

        const refreshToken = jwt.sign(matchedUser[0], String(process.env.HASH_REFRESH_TOKEN_DATA))

        const today = new Date()

        const updateToken = await db
        .collection('tokens')
        .findOneAndUpdate({
            userId: new ObjectId(matchedUser[0]._id)
        }, {
            $set: {
                refreshToken, 
                expireDate: new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
            } 
        })

        if (!updateToken.value){
            const refreshTokenId = await db
            .collection('tokens')
            .insertOne({
                userId: matchedUser[0]._id,
                refreshToken, 
                expireDate: new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
            })

            db.collection('users').findOneAndUpdate({_id: matchedUser[0]._id}, {$set: {refreshToken: refreshTokenId.insertedId, isLogged: true}})

        }
        
        db.collection('users').findOneAndUpdate({_id: matchedUser[0]._id}, {$set: {isLogged: true}})

        return res.status(200).send({token, refreshToken})

    } catch (err) {
        console.log(err)
        res.status(500).send({message: "Algo deu errado"}).end()
    }
})

export default loginRoute