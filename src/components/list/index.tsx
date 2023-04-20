import React from "react";
import AnimeCard from "components/card";
import { Animetype } from 'utils/constant';

interface ListProps {
  options?: IntersectionObserverInit;
  data?: any;
  handleViewDetail: (id: string) => void;
}

const List = (props: ListProps) => {

  const { data, handleViewDetail } = props;

  return (
    <>
      <div className="anime-content">
          {
            data && data.map((item : Animetype, index: number) => 
            (
              <div 
                className="anime-list"
                key={`anime-list-${item?.id}-${String(index)}`}
                onClick={() => handleViewDetail(item.id)}
              >
                <AnimeCard item={item}/>
              </div>
            ))
          }
        </div>
      <style jsx>
        {`
          .anime-shimmer {
            min-width: 100vw;
            height: 100vh;
          }
          .anime-content {
            max-width: 1050px;
            margin: 0 auto;
            display: grid;
            gap: 15px;
            grid-template-columns: repeat(5, 1fr);
          }
          .anime-list {
            width: 100%;
            width: 200px;
            display: flex;
          }
          @media (max-width: 1050px) {
            .anime-content { 
              grid-template-columns: repeat(4, 1fr);
            }
          }
          @media (max-width: 840px) {
            .anime-content { 
              grid-template-columns: repeat(3, 1fr);
            }
          }
          @media (max-width: 620px) {
            .anime-content { 
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 410px) {
            .anime-content { 
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

export default List;
