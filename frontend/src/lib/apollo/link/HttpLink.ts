import { HttpLink } from "@apollo/client"

export const httpLink = new HttpLink({
    uri: `${process.env.BACKEND_SCHEME}://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/graphql`,
    headers: {
        authorization: `Bearer ${process.env.BACKEND_TOKEN}`
    },
});