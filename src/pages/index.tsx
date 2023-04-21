import { ApolloProvider } from "@apollo/client";
import client from "graphql/apollo-client";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getViewer from "graphql/user/viewer";
import Head from "next/head";

const AnimeList = dynamic(() => import("container/anime-list"), {
  ssr: true,
});


export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null | undefined>();
  const [clientId, setClientId] = useState<string | null | undefined>();

  useEffect(() => {
    const idClient  = process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID;
    const token = localStorage.getItem('token');
    setToken(token);
    setClientId(idClient);
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

  useEffect(() => {

    const authUser = localStorage.getItem("auth")

    if (token && !authUser) {
      
      const fetchData = async () => {
  
        try {
          const data : any = await getViewer({});
          const Viewer = data?.data?.Viewer;
          if (Viewer) {
            const auth = {
              id: Viewer?.id,
              name: Viewer?.name
            }

            localStorage.setItem("auth", JSON.stringify(auth))
          }
  
        } catch {
          console.log("error get viewer")
        } 
      }

      fetchData();
    }
  }, [token])

  const handleShowBookmark = () => {
    window.location.href = `/anime/bookmark`;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    window.location.href = `/`;
  }
  
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="height=device-height,width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
        <title>Anime World</title>
        <meta
          name="description"
          content="Anime World"
        />
        <meta
          property="og:title"
          content="Anime World"
        />
        <meta
          property="og:description"
          content="Anime World"
        />
      </Head>
      <div className="anime-page"> 
        <div className="anime-content">
          <div className="anime-title-top" style={{color: "#1b101f"}}>
            <h1 className="anime-title-page" data-testid="title" id="title">ANIME WORLD</h1>
            <div className="anime-action">
              {
                !token && clientId && (<a className="anime-tool" href={`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`}>Login with AniList</a>)
              }
              {
                token && (
                  <div
                    className="anime-tool"
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      fontSize: 16,
                      alignItems: "center",
                      color: "#1b101f"
                    }}
                    onClick={handleShowBookmark}
                  >
                    <p style={{fontWeight: 600, marginRight: 8}}>Your Bookmark</p>
                    <span className="material-symbols-rounded">bookmark</span>
                  </div>)
              }
              {
                token && (
                  <div
                    className="anime-tool"
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      fontSize: 16,
                      alignItems: "center",
                      color: "#1b101f"
                    }}
                    onClick={handleLogout}
                  >
                    <p style={{fontWeight: 600, marginRight: 8}}>Logout</p>
                    <span className="material-symbols-rounded">logout</span>
                  </div>)
              }
            </div>
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
          .anime-title-top {
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            max-width: 1200;
            margin: 0 0 50px; 
          }
          .anime-title-page {
            letter-spacing: 0.08rem;
          }
          .anime-action {
            display: flex;
            justify-content: space-between; 
            align-items: center; 
            gap: 15px;
          }
          .anime-action input{
            width: 100%;
						font-size: 16px;
						padding: 4px 8px;
						border-radius: 16px;
						text-decoration: none;
						outline: none !important;
						transition: 300ms box-shadow;
						border: solid 1px rgba(0, 0, 0, .2);
						box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .anime-title-top {
              display: flex; 
              flex-direction: column;
              justify-content: space-between; 
              align-items: center; 
              max-width: 1200;
              margin: 0 0 50px; 
              gap: 10px;
            }
            .anime-action {
              width: 100%;
              justify-content: center;
              flex-direction: column;
            }
            .anime-tool { 
              width: 80%;
              justify-content: center;
            }
          }
        `}
      </style>
    </>
  )
}


