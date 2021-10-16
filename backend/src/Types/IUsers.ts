import { ObjectId } from "mongodb";

export interface IUser {
    _id?: ObjectId
    userName: string;
    email: string;
    password: string;
    posts: string[];
    comments: string[];
    refreshToken: string | ObjectId;
    isLogged: boolean;
}

export interface ITokenfiedUser {
    _id: string;
    userName: string;
    email: string;
    isLogger: boolean;
}