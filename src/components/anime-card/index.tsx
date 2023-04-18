import React, { useRef, useEffect } from "react";
import { Animetype } from 'utils/constant';
import AnimeImage from "components/anime-image";

interface CardProps {
  item: Animetype,
}

const Card = (props: CardProps) => {
  const { item } = props;
  const { title, coverImage, averageScore, popularity } = item;

  return (
    <>
      <div className="card">
        <div className="card-image">
          <AnimeImage src={coverImage.large}/>
        </div>
        <div className="card-info">
          <div className="card-title">
            {title.english && <p className="card-title english">{title.english }</p>}
            {
              title.native?.toLowerCase() !== title.english?.toLowerCase() && <p className="card-title native">{title.native }</p>
            }
          </div>
          <div className="card-count">
            <div className="card-score">{averageScore}</div>
            <div className="card-popularity">{popularity}</div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            cursor: pointer;
          }
          .card-image {
            position: relative;
          }
          .card-count {
            display: flex: 
          }
          
        `}
      </style>
    </>
  );
};

export default Card;
