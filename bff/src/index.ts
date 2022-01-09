import { ApolloServer } from "apollo-server";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import { verify } from "jsonwebtoken";

import { RegisterAPI } from "./dataSources/registerApi";
import { LoginAPI } from "./dataSources/loginApi";
import { PostAPI } from "./dataSources/postApi";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            registerAPI: new RegisterAPI(),
            loginAPI: new LoginAPI(),
            postAPI: new PostAPI(),
        };
    },
    context: ({ req }) => {
        try {
            const { iat, exp, ...token } = verify(
                req.headers.authorization || "",
                "usoppn"
            ) as any;

            return {
                user: {
                    isLogged: token.isLogged,
                    id: token._id,
                    token: req.headers.authorization,
                },
            };
        } catch (error) {
            console.log({ error });

            return { user: null };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`\nServer running on ${url}`);
});
