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

            return data;
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
