import { ObjectId } from 'mongodb';

export interface ICommentLikes {
    _id?: ObjectId;
    userId: ObjectId;
    commentId: ObjectId
}

export interface IPostLikes {
    _id?: ObjectId;
    userId: ObjectId;
    postId: ObjectId
}