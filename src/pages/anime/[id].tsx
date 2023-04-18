import React from "react";
import { useRouter } from "next/router";

import dynamic from 'next/dynamic';

const AnimeDetail = dynamic(() => import("container/anime-detail"), {
  ssr: false,
});

const Detail = () => {

  const { query } = useRouter();
  const { id } = query ;

  return (
    <>
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
