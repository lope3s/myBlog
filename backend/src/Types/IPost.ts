import { ObjectId } from 'mongodb';

export interface IPost {
    _id?: string | ObjectId;
    content: string;
    date: string | Date;
    likes: string[] | ObjectId[];
    comments: string[] | ObjectId[];
}