import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

/**
 * Verifica se um token de autênticação foi informado e se o token é válido.
 * @returns Retorna os dados do usuário parseado em req.body.user.
 */

export const tokenAuthenticate = () => (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if (!token){
        return res.status(401).send({message: "Autênticação não fornecida"}).end()
    }

    jwt.verify(token, String(process.env.HASH_TOKEN_DATA), (err, user) => {
        if (err) {
            return res.status(403).send({message: "Token inválido"}).end()
        }
        req.body.user = user
        next()
    })
}