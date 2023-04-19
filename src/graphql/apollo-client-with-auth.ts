import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co',
});

const token = localStorage.getItem('token');

const authLink = setContext((_, { headers }) => {
    
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
  link: token ? authLink.concat(httpLink) : httpLink ,
  cache: new InMemoryCache()
});

export default client;