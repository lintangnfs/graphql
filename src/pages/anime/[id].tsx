import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import dynamic from 'next/dynamic';

const AnimeDetail = dynamic(() => import("container/anime-detail"), {
  ssr: false,
});

const Detail = () => {

  const { query } = useRouter();
  const { id } = query ;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="height=device-height,width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
        <title>Detail -Anime World</title>
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
      {
        id && <AnimeDetail dataId={`${id}`}/>
      }
      <style jsx>
        {`
          
        `}
      </style>
    </>
  );
};

export default Detail;
