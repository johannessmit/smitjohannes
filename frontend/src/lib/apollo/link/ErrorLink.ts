import {onError} from "@apollo/client/link/error";

export const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.groupCollapsed('GraphQL ErrorLog');
    if (graphQLErrors) {
        graphQLErrors.forEach(({message, locations, path}) => {
            console.error(
                `[GraphQL Error]: Message ${message}, Location ${location}, Path: ${path}`
            );
        });
    }

    if (networkError) {
        console.error(
            `[Network Error]: ${networkError}`
        );
    }
    console.groupEnd();
});