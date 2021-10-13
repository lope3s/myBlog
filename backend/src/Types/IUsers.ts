import { ObjectId } from "mongodb";

export interface IUser {
    _id?: ObjectId
    userName: string;
    email: string;
    password: string;
    posts: string;
    comments: string[] | ObjectId[];
    likes: string[] | ObjectId[];
    refreshToken: string | ObjectId;
    isLogged: boolean;
}

export interface ITokenfiedUser {
    _id: string;
    userName: string;
    email: string;
    isLogger: boolean;
}