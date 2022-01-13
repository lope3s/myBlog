import { AuthenticationError, ForbiddenError } from "apollo-server";

const resolvers = {
    Query: {
        start: () => "Hello from GQL",
        getAllPosts: async (_: any, __: any, { dataSources, user }: any) => {
            if (!user) throw new AuthenticationError("Nenhum token fornecido");

            if (!user.isLogged)
                throw new ForbiddenError(
                    "Você precisa estar logado para acessar esta rota"
                );

            const data = await dataSources.postAPI.getAllPosts(user.token);

            const verifiedIds: any[] = [];

            const fechedUserData = await Promise.all(
                data.posts.map(async (post: any) => {
                    if (!verifiedIds.includes(post.userId)) {
                        verifiedIds.push(post.userId);
                        const postUser = await dataSources.userAPI.getUserById(
                            post.userId,
                            user.token
                        );

                        const {
                            password,
                            email,
                            posts,
                            comments,
                            isLogged,
                            refreshToken,
                            ...rest
                        } = postUser;

                        return rest;
                    }
                })
            );

            const filteredUserFetchedData = fechedUserData.filter(
                (val) => val !== undefined
            );

            const joinedUserData = data.posts.map((value: any) => {
                const matchedUser = filteredUserFetchedData.find(
                    (val: any) => val._id === value.userId
                );

                return { ...value, user: matchedUser };
            });

            return joinedUserData;
        },
    },
    Post: {
        likes(parent: any) {
            return parent.likes;
        },
        comments(parent: any) {
            return parent.comments;
        },
    },
    Comment: {
        likes(parent: any) {
            return parent.likes;
        },
    },

    Mutation: {
        register: async (_: any, userObject: any, { dataSources }: any) => {
            const data = await dataSources.registerAPI.registerUser(userObject);

            return data;
        },
        login: async (_: any, userObject: any, { dataSources }: any) => {
            const data = await dataSources.loginAPI.login(userObject);

            return data;
        },
        post: async (_: any, postObject: any, { dataSources, user }: any) => {
            if (!user) throw new AuthenticationError("Nenhum token fornecido");

            if (!user.isLogged)
                throw new ForbiddenError(
                    "Você precisa estar logado para acessar esta rota"
                );

            const data = await dataSources.postAPI.createPost(
                postObject,
                user.token
            );

            return data;
        },
    },
};

export default resolvers;
