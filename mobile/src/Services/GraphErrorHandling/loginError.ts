import { ApolloError } from "@apollo/client";

const loginError = (error: ApolloError, serverError: string, setServerError: (value: string) => void) => {
    if (error?.graphQLErrors[0] && !serverError){
        const err = error?.graphQLErrors[0] as any
        const errValues = err.extensions.response.body.message

        setServerError(errValues)
    }
}

export default loginError