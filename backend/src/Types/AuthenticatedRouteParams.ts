import { ITokenfiedUser } from "./IUsers";

export interface IPostOrCommentParams {
    content: string;
    user: ITokenfiedUser
}