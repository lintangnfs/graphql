import { ApolloClient, InMemoryCache, } from "@apollo/client";

const URL = 'https://anilist.co/api/v2/oauth/token'

const auth = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
});

export default auth;