export interface IUser {
  email: string;
  isLogged: boolean;
  userName: string;
  _id: string;
}

export interface IErrorResponse {
  body: any;
  status: number;
  statusText: string;
  url: string;
}
