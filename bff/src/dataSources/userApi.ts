import { RESTDataSource } from "apollo-datasource-rest";

export class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://localhost:5001/myBlogApi";
    }

    async getUserById(id: string, token: string) {
        return this.get(
            `/getUserById/${id}`,
            {},
            {
                headers: { authorization: token },
            }
        );
    }
}
