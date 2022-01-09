import { RESTDataSource } from "apollo-datasource-rest";
import { IPostTypes } from "../Types/postTypes";

export class PostAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://localhost:5001/myBlogApi";
    }

    async createPost(post: IPostTypes, token: any) {
        try {
            return this.post("/createPost", post, {
                headers: { authorization: token },
            });
        } catch (error) {
            console.log("\n\n passei aqui \n\n");
        }
    }
}
