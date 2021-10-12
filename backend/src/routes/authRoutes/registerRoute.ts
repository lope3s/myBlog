import { client } from '../../db';
import express, { Request, Response} from 'express';
import { IUser } from '../../Types/IUsers';
import checkUserAlreadyExist from '../../services/checkUserAlreadyExist';
import createPassHash from '../../services/createPassHash';
import { checkFields } from '../../middlewares/checkFields';

const db = client.db()
const registerRoute = express.Router()

registerRoute.post("/register", checkFields(['userName', 'password', 'email']), async (req: Request<any, any, IUser>, res: Response) => {
    try {
        const { userName, password, email } = req.body

        const checkIfUserExist = await checkUserAlreadyExist(email, userName, {_id: 0, email: 1, userName: 1})

        if (!checkIfUserExist.length){
            if (password){

                const hashedUserData = {
                    ...req.body, 
                    password: createPassHash(password),  
                    posts: [], 
                    comments: [], 
                    likes: [], 
                    isLogged: false,
                    refreshToken: null
                }

                await db.collection("users").insertOne(hashedUserData)

                return res.status(201).send({message: "Usuário registrado"}).end()
            }

            return res.status(400).send({message: 'Senha não pode ser vazia'}).end()
        }
        
        const existentValue = checkIfUserExist.map(obj => {
            const indicationStrings = Object.entries(obj).filter(([key, value]) => {
                if (key === 'userName'){
                    if (value === userName){
                        return true
                    }
                }

                if (key === 'email'){
                    if (value === email){
                        return true
                    }
                }
            }).map(value => {
                return `${value.join(": ")} já existe`
            })

            return indicationStrings
        })

        const parsedExistentValue = existentValue.length === 2 ? [...existentValue[0], ...existentValue[1]] : [...existentValue[0]]

        return res.status(400).send({message: parsedExistentValue}).end()

    }catch (err) {
        console.log(err)
        return res.status(500).send({message: "Erro interno"}).end()
    }
})

export default registerRoute