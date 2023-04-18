import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { CachePersistor } from "apollo-cache-persist";
import { PersistedData, PersistentStorage } from "apollo-cache-persist/types";

const URL = 'https://graphql.anilist.co'
const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
});

export default client;