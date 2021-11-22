import { ApolloError } from "@apollo/client";

interface IServerError {
    userName: string
    email: string
    touched: boolean
}

const registerError = (error: ApolloError, serverError: IServerError, setServerError: (value: IServerError) => void) => {
    if (error?.graphQLErrors[0] && !serverError.touched){
        const err = error?.graphQLErrors[0] as any
        const errValues = err.extensions.response.body.message

        const obj = {userName: '', email: ''} as any

        errValues.forEach((string: string) => {
            const splitedValues = string.split(':')
            obj[splitedValues[0]] =  splitedValues[1]
        })

        setServerError({...obj, touched: true})
    }
}

export default registerError