import { ObjectId } from "mongodb";

export interface IUser {
    _id?: ObjectId
    userName: string;
    email: string;
    password: string;
    posts: string[] | ObjectId[];
    comments: string[] | ObjectId[];
    likes: string[] | ObjectId[];
    refreshToken: string | ObjectId;
    isLogged: boolean;
}