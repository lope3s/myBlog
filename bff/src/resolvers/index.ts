const resolvers = {
    Query: {
        start: () => "Hello from GQL"
    },

    Mutation: {
        register: async (_:any, userObject: any, {dataSources}: any) => {
            const data = await dataSources.registerAPI.registerUser(userObject)

            return data
        },
        login: async (_: any, userObject: any, {dataSources}: any) => {
            const data = await dataSources.loginAPI.login(userObject)

            return data
        },
        post: async(_: any, postObject: any, {dataSources}: any, info: any) => {
            const data = await dataSources.postAPI.createPost(postObject)

            return data
        }
    }
}

export default resolvers