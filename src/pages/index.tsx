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
          <div><h1 className="anime-title-page">ANIME WORLD</h1></div>
          <ApolloProvider client={client}>
            <AnimeList />
          </ApolloProvider>
        </div>
      </div>
      <style jsx>
        {`
          .anime-page {
            min-width: 100vw;
            width: max-content;
            height: 100vh;
            display: flex;
            background-color: #faf9f2;
          }
          .anime-content {
            margin: 50px auto;
            max-width: 1200px;
          }
          .anime-title-page {
            margin: 0 0 30px; 
            letter-spacing: 0.08rem;
            font-family: 'Nunito', sans-serif;
          }
        `}
      </style>
    </>
  )
}


