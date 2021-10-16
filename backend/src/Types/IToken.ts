export interface IRefreshToken {
    refreshToken: string;
}

export interface ITokenUser {
    user: {
        _id: string;
        userName: string;
        email: string;
        isLogged: boolean;
    };
}