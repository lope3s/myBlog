import { RESTDataSource } from "apollo-datasource-rest";
import { IPostTypes } from "../Types/postTypes";

export class PostAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://localhost:5001/myBlogApi";
    }

    async createPost(post: IPostTypes, token: any) {
        return this.post("/createPost", post, {
            headers: { authorization: token },
        });
    }

    async getAllPosts(token: any) {
        return this.get(
            "/getPosts",
            {},
            {
                headers: { authorization: token },
            }
        );
    }

    async likeAPost(postId: string, token: string) {
        return this.get(
            `/postLike/${postId}`,
            {},
            {
                headers: { authorization: token },
            }
        );
    }
}
