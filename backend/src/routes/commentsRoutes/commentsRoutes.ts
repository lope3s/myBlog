import expres, { Request, Response } from 'express';
import { client } from '../../db';
import { tokenAuthenticate } from '../../middlewares/tokenAuthenticate';
import { checkFields } from '../../middlewares/checkFields';

import { IPostOrCommentParams } from '../../Types/AuthenticatedRouteParams';
import { ObjectId } from 'mongodb';
import { IUser } from '../../Types/IUsers';

const db = client.db();
const commentRoute = expres.Router();

commentRoute.post('/commentRegister/:postId', tokenAuthenticate(), checkFields(['content']), async(req: Request<{postId: string}, any, IPostOrCommentParams>, res: Response) => {
    try {
        const { content, user } = req.body
        const { postId } = req.params

        const comment = {
            postId: new ObjectId(postId),
            creationDate: new Date(),
            lastModified: new Date(),
            likes: [],
            content: content,
            userId: new ObjectId(user._id)
        }

        const createdComment = await db.collection('comments').insertOne(comment)

        if (createdComment.acknowledged){
            db.collection('users').findOneAndUpdate({_id: new ObjectId(user._id)}, {$addToSet: {comments: createdComment.insertedId.toString() as any}})
            db.collection('posts').findOneAndUpdate({_id: new ObjectId(postId)}, {$addToSet: {comments: createdComment.insertedId.toString() as any}})
            return res.status(201).send({message: 'Comentário adicionado'}).end()
        }

        return res.status(500).send({message: "Algo de errado aconteceu"}).end()

    } catch (err) {
        console.log(err)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

commentRoute.get('/getPostComments/:postId', tokenAuthenticate(), async(req: Request<{postId: string}>, res: Response) => {
    try {
        const { postId } = req.params

        const filteredPostComments = await db.collection('comments').find({postId: new ObjectId(postId)}).toArray()

        return res.status(200).send({filteredPostComments}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

commentRoute.put('/updateComment/:commentId', tokenAuthenticate(), checkFields(['content']), async(req: Request<{commentId: string}, any, IPostOrCommentParams>, res: Response) => {
    try {
        const { commentId } = req.params
        const { user, content } = req.body

        const dbUser = await db.collection('users').findOne({_id: new ObjectId(user._id)}) as IUser

        if (dbUser.comments.includes(commentId)){
            await db.collection('comments').findOneAndUpdate({_id: new ObjectId(commentId)}, {$set: {content, lastModified: new Date()}})

            return res.status(200).send({message: 'Comentário atualizado'}).end()
        }

        return res.status(400).send({message: "Você não pode atualizar um comentário que não é seu"}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

commentRoute.delete('/deleteComment/:commentId', tokenAuthenticate(), async(req: Request<{commentId: string}, any, {user: {_id: string, userName: string, email: string, isLogged: boolean}}>, res: Response) => {
    try {
        const { commentId } = req.params
        const { user } = req.body
        
        const dbUser = await db.collection('users').findOne({_id: new ObjectId(user._id)}) as IUser

        if (dbUser.comments.includes(commentId)){
            await db.collection('comments').findOneAndDelete({_id: new ObjectId(commentId)})
            await db.collection('posts').findOneAndUpdate({comments: commentId}, {$pull: {comments: commentId as any}})
            await db.collection('users').findOneAndUpdate({_id: new ObjectId(user._id)}, {$pull: {comments: commentId as any}})

            return res.status(204).end()
        }

        return res.status(400).send({message: "Você não pode deletar um comment que não é seu"}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})


export default commentRoute