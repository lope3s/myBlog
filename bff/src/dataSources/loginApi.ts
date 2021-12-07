import { RESTDataSource } from "apollo-datasource-rest";
import { ILoginUser } from '../Types/loginUserType';

export class LoginAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://localhost:5001/myBlogApi"
    }

    async login (userObject: ILoginUser) {
        return this.post('/login', userObject)
    }
}