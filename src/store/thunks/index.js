import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const defaultOptions = {
    query: {
        fetchPolicy: "network-only",
    },
};

const server = "localhost:8000/query/";

const wsLink = new WebSocketLink({
    uri: `ws://${server}`,
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: `http://${server}`,
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions,
});