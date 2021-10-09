import { ObjectId } from 'mongodb'

export interface IRefreshToken {
    _id?: string | ObjectId;
    refreshToken: string;
    expireDate: string | Date;
}