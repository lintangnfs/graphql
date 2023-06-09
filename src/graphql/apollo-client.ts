import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co',
});

const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;

const authLink = setContext((_, { headers }) => {
    
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: token ? authLink.concat(httpLink) : httpLink ,
  cache: cache
});

export default client;