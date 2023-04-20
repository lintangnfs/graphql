import { ApolloProvider } from "@apollo/client";
import client from "graphql/apollo-client";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserFav = dynamic(() => import("container/user-favourite"), {
  ssr: false,
});

export default function Bookmark() {
  
  return (
    <>
      <div className="anime-page"> 
        <div className="anime-content">
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <h1 className="anime-title-page" style={{color: "#1b101f"}}>YOUR FAVOURITE</h1>
          </div>
          <ApolloProvider client={client}>
            <UserFav/>
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


