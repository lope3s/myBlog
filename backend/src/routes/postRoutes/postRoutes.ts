import { client } from '../../db';
import express, { Request, Response } from 'express';
import { tokenAuthenticate } from '../../middlewares/tokenAuthenticate';
import { checkFields } from '../../middlewares/checkFields';

import { ObjectId } from 'mongodb';
import { IPostParams } from '../../Types/AuthenticatedRouteParams';
import { IUser } from '../../Types/IUsers';

const db = client.db()
const postRoute = express.Router()

postRoute.post('/createPost', tokenAuthenticate(), checkFields(['content']),async (req: Request<any, any, IPostParams>, res: Response) => {
    try {
        const { content, user } = req.body

        const post = {
            content,
            userId: new ObjectId(user._id),
            likes: [],
            comments: [],
            creationDate: new Date(),
            lastModified: new Date(),
        }

        const createdPost = await db.collection('posts').insertOne(post)

        if (createdPost.acknowledged){
            db.collection('users').findOneAndUpdate({_id: new ObjectId(user._id)}, {$addToSet: {posts: createdPost.insertedId.toString() as any}})
            return res.status(201).send({message: 'Post criado'}).end()
        }

        return res.status(500).send({message: "Algo de errado aconteceu"}).end()

    } catch(err) {
        console.log(err)
        return res.status(500).send({message: 'Algo deu errado'}).end()
    }
})

postRoute.get('/getPosts', tokenAuthenticate(), async(req: Request, res: Response) => {
    try {
        const posts = await db.collection('posts').find({}).toArray()

        return res.status(200).send({posts}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

postRoute.get('/getUserPosts/:userId', tokenAuthenticate(), async(req: Request<{userId: string}>, res: Response) => {
    try {
        const { userId } = req.params

        const filteredUserPosts = await db.collection('posts').find({userId: new ObjectId(userId)}).toArray()

        return res.status(200).send({filteredUserPosts}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

postRoute.put('/updatePost/:postId', tokenAuthenticate(), checkFields(['content']), async(req: Request<{postId: string}, any, IPostParams>, res: Response) => {
    try {
        const { postId } = req.params
        const { user, content } = req.body

        const dbUser = await db.collection('users').findOne({_id: new ObjectId(user._id)}) as IUser

        if (dbUser.posts.includes(postId)){
            await db.collection('posts').findOneAndUpdate({_id: new ObjectId(postId)}, {$set: {content, lastModified: new Date()}})

            return res.status(200).send({message: 'Post atualizado'}).end()
        }

        return res.status(400).send({message: "Você não pode atualizar um post que não é seu"}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

postRoute.delete('/deletePost/:postId', tokenAuthenticate(), async(req: Request<{postId: string}, any, {user: {_id: string, userName: string, email: string, isLogged: boolean}}>, res: Response) => {
    try {
        const { postId } = req.params
        const { user } = req.body
        
        const dbUser = await db.collection('users').findOne({_id: new ObjectId(user._id)}) as IUser

        if (dbUser.posts.includes(postId)){
            await db.collection('posts').findOneAndDelete({_id: new ObjectId(postId)})
            await db.collection('users').findOneAndUpdate({_id: new ObjectId(user._id)}, {$pull: {posts: postId as any}})

            return res.status(204).end()
        }

        return res.status(400).send({message: "Você não pode deletar um post que não é seu"}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

export default postRoute