import React from "react";
import { Animetype } from 'utils/constant';
import AnimeImage from "components/anime-image";

interface CardProps {
  item: Animetype
}

const Card = (props: CardProps) => {
  const { item } = props;
  const { title, coverImage } = item;

  console.log("items", item)

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
            <div className="card-score"></div>
            <div className="card-popularity"></div>
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
          
        `}
      </style>
    </>
  );
};

export default Card;
