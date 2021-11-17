import { RESTDataSource } from 'apollo-datasource-rest';
import { IRegisterUser } from '../Types/registerUserType';

export class RegisterAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = "http://localhost:5001/myBlogApi"
    }

    async registerUser(userObject: IRegisterUser) {
        return this.post('/register', userObject)
    }
}