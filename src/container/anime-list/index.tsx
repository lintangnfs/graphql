import React, {useState} from "react";
import { useQuery, gql } from "@apollo/client"; 
import qAnimeList from "graphql/anime/list/query";
import AnimeCard from "components/anime-card";
import { Animetype } from 'utils/constant';

interface AnimeListProps {

}

const AnimeList = (props: AnimeListProps) => {

  const [variables, setVariables] = useState({
    page: 1,
    perPage: 15,
  });

  const { loading, error, data } = useQuery(qAnimeList, {
    variables: variables
  });

  const media = data && data.Page.media;


  return (
    <>
      <div className="anime-content">
        {
          media && media.map((item : Animetype) => (
            <div 
              className="anime-list"
              key={`anime-list-${item?.id}`}
            >
              <AnimeCard item={item}/>
            </div>
          ))
        }
      </div>
      <style jsx>
        {`
          .anime-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(5, 1fr);
          }
          .anime-list {
            justify-self: center;
          }
          @media (max-width: 1070px) {
            .anime-content { 
              grid-template-columns: repeat(4, 1fr);
            }
          }
          @media (max-width: 799px) {
            .anime-content { 
              grid-template-columns: repeat(3, 1fr);
            }
          }
          @media (max-width: 399px) {
            .anime-content { 
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

export default AnimeList;
