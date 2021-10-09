import { ObjectId } from 'mongodb';

export interface ILikes {
    _id?: string | ObjectId;
    userId: string | ObjectId;
}