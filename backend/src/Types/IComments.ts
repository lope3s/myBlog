import { ObjectId } from 'mongodb';

export interface IComments {
    id?: string |  ObjectId;
    date: string | Date;
    likes: string[] | ObjectId[];
    content: string;
}