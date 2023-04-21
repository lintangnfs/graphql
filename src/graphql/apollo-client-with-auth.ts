import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CachePersistor } from 'apollo-cache-persist';

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co',
});

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

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

if (typeof window !== "undefined") {
  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage as any,
  })
  
  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)
  
  if (currentVersion === SCHEMA_VERSION) {
    persistor.restore()
  } else {
    persistor.purge()
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }
}


const client = new ApolloClient({
  link: token ? authLink.concat(httpLink) : httpLink ,
  cache: cache
});

export default client;