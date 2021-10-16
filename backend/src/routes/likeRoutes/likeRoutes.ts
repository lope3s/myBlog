import expres, { Request, Response } from 'express';
import { client } from '../../db';
import { tokenAuthenticate } from '../../middlewares/tokenAuthenticate';
import { checkFields } from '../../middlewares/checkFields';

import { IPostOrCommentParams } from '../../Types/AuthenticatedRouteParams';
import { ObjectId } from 'mongodb';
import { IUser } from '../../Types/IUsers';
import { ICommentLikes, IPostLikes } from '../../Types/ILikes';

const db = client.db();
const likeRoute = expres.Router();

likeRoute.get('/commentLike/:commentId', tokenAuthenticate(), async(req: Request<{commentId: string}, any, {user: {_id: string, userName: string, email: string, isLogged: boolean}}>, res: Response) => {
    try {
        const { commentId } = req.params
        const { user: {_id} } = req.body

        
        const commentLike = await db.collection('likes').findOne({userId: new ObjectId(_id), commentId: new ObjectId(commentId)})
        
        if (commentLike){
            await db.collection('likes').findOneAndDelete({_id: commentLike._id})
            await db.collection('comments').findOneAndUpdate({_id: new ObjectId(commentId)}, {$pull: {likes: new ObjectId(commentLike._id).toString() as any}})
            return res.sendStatus(204).end()
        }
        
        const like: ICommentLikes = {
            userId: new ObjectId(_id),
            commentId: new ObjectId(commentId)
        }

        const insertedCommentLike = await db.collection('likes').insertOne(like)

        if (insertedCommentLike.acknowledged){
            db.collection('comments').findOneAndUpdate({_id: new ObjectId(commentId)}, {$addToSet: {likes: insertedCommentLike.insertedId.toString() as any}})
            return res.status(201).send({message: 'Like adicionado'}).end()
        }

        return res.status(500).send({message: "Algo de errado aconteceu"}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})

likeRoute.get('/postLike/:postId', tokenAuthenticate(), async(req: Request<{postId: string}, any, {user: {_id: string, userName: string, email: string, isLogged: boolean}}>, res: Response) => {
    try {
        const { postId } = req.params
        const { user: {_id} } = req.body

        
        const postLike = await db.collection('likes').findOne({userId: new ObjectId(_id), postId: new ObjectId(postId)})
        
        if (postLike){
            await db.collection('likes').findOneAndDelete({_id: postLike._id})
            await db.collection('posts').findOneAndUpdate({_id: new ObjectId(postId)}, {$pull: {likes: new ObjectId(postLike._id).toString() as any}})
            return res.sendStatus(204).end()
        }
        
        const like: IPostLikes = {
            userId: new ObjectId(_id),
            postId: new ObjectId(postId)
        }

        const insertedpostLike = await db.collection('likes').insertOne(like)

        if (insertedpostLike.acknowledged){
            db.collection('posts').findOneAndUpdate({_id: new ObjectId(postId)}, {$addToSet: {likes: insertedpostLike.insertedId.toString() as any}})
            return res.status(201).send({message: 'Like adicionado'}).end()
        }

        return res.status(500).send({message: "Algo de errado aconteceu"}).end()

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Algo deu errado"}).end()
    }
})


export default likeRoute