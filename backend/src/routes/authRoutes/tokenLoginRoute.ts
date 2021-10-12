import express, {  Request, Response } from 'express';
import { client } from '../../db';
import { checkFields } from '../../middlewares/checkFields';
import { tokenAuthenticate } from '../../middlewares/tokenAuthenticate';
import jwt from 'jsonwebtoken';

import { IRefreshToken, ITokenUser } from '../../Types/IToken';
import { IUser } from '../../Types/IUsers';
import {ObjectId} from 'mongodb';

const db = client.db()
const tokenRoute = express.Router()

tokenRoute.get('/tokenLogin', tokenAuthenticate(), (req: Request<any, any, ITokenUser>, res: Response) => {
    db.collection('users').findOneAndUpdate({_id: new ObjectId(req.body.user._id)}, {$set: {isLogged: true}})

    return res.status(200).end()
})

tokenRoute.post('/tokenRefresh', checkFields(['refreshToken']), async(req: Request<any, any, IRefreshToken>, res: Response) => {
    try{
        const { refreshToken } = req.body

        const userDate: IUser | void = jwt.verify(refreshToken, String(process.env.HASH_REFRESH_TOKEN_DATA), (err, user) => {
            if (err) {
                return res.status(403).send({message: "Token inválido"}).end()
            }

            return user as IUser
        })

        const dbRefreshToken = await db.collection('tokens').findOne({userId: new ObjectId(userDate!._id)})

        if (!dbRefreshToken) {
            return res.status(404).send({message: 'Token não encontrado. Faça login para atualizar'}).end()
        }

        const today = new Date()

        if (dbRefreshToken.expireDate < today){
            return res.status(403).send({message: "Token expirado, faça login para atualizar"}).end()
        }

        const token = jwt.sign(userDate!, String(process.env.HASH_TOKEN_DATA))

        return res.status(200).send({token}).end()

    } catch (err) {
        console.log(err)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

export default tokenRoute