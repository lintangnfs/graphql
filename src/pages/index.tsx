import Head from 'next/head'
import { ApolloProvider } from "@apollo/client";
import client from "graphql/apollo-client";
import dynamic from 'next/dynamic';

const AnimeList = dynamic(() => import("container/anime-list"), {
  ssr: false,
});

export default function Home() {

  
  return (
    <>
      <div className="anime-page"> 
        <div className="anime-content">
          <div><h1>ANIME WORLD</h1></div>
          <ApolloProvider client={client}>
            <AnimeList />
          </ApolloProvider>
        </div>
      </div>
      <style jsx>
        {`
          .anime-page {
            width: 100vw;
            height: 100vh;
            display: flex;
          }
          .anime-content {
            margin: auto;
          }
        `}
      </style>
    </>
  )
}


