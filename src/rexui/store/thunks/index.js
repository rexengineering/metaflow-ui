import { ApolloClient, InMemoryCache } from "@apollo/client";

const defaultOptions = {
    query: {
        fetchPolicy: "network-only",
    },
};

export const apolloClient = new ApolloClient({
    uri: "http://localhost/prism-api/query/",
    cache: new InMemoryCache(),
    defaultOptions,
});