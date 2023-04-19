import { ApolloProvider } from "@apollo/client";
import client from "graphql/apollo-client";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AnimeList = dynamic(() => import("container/anime-list"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null | undefined>();

  const clientId = process.env.ANILIST_CLIENT_ID;

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, [])

  useEffect(() => {
    if (window.location.href.includes("access_token")) {
      window.localStorage.setItem(
        "token",
        window.location.href.split("=")[1].split("&")[0] ?? "none",
      );
      router.push("/");
    }
  }, [router]);

  
  return (
    <>
      <div className="anime-page"> 
        <div className="anime-content">
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h1 className="anime-title-page">ANIME WORLD</h1>
            {
              token ? (<a href={`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`}>Login with AniList</a>) 
                : (<div>Bookmark</div>)
            }
          </div>
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
            min-height: 100vh;
            height: max-content;
            display: flex;
            background-color: #faf9f2;
          }
          .anime-content {
            margin: 50px auto;
            max-width: 1200px;
            font-family: 'Nunito', sans-serif;
          }
          .anime-title-page {
            margin: 0 0 30px; 
            letter-spacing: 0.08rem;
          }
        `}
      </style>
    </>
  )
}


