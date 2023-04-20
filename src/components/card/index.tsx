import React from "react";
import { Animetype } from 'utils/constant';
import AnimeImage from "components/image";
import Rating from "components/rating";

interface CardProps {
  item: Animetype,
}

const Card = (props: CardProps) => {
  const { item } = props;
  const { title, genres, coverImage, averageScore } = item;

  const handleTextEllipsis = () => {
    const titleCheck = title.english ?? title.native;
    if (titleCheck.length > 50) {
      return `${titleCheck.substring(0, 47)}...`
    }
    return titleCheck;
  }

  return (
    <>
      <div className="card">
        <div className="card-image">
          <AnimeImage src={coverImage.large}/>
        </div>
        <div className="card-info">
          <div className="card-title">
            {(title.english || title.native) && <p className="card-title">{handleTextEllipsis()}</p>}
          </div>
          <div className="card-detail">
            <div className="card-rating">{genres?.join(" | ")}</div>
            {
              averageScore && (
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <Rating rating={averageScore / 20} total={5} />
                  <div className="card-average">{`(${averageScore})`}</div>
              </div>
              )
            }
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            cursor: pointer;
            border-radius: 16px;
            background-color: #1b101f;
            font-family: 'Nunito', sans-serif;
            transition: transform .2s; 
            margin: 10 0;
          }
          .card:hover {
            transform: scale(1.05);
          }
          .card-image {
            position: relative;
          }
          .card-image:after {
            content:'';
            position: absolute;
            left:0; 
            top:0;
            width:100%; 
            height:100%;
            z-index: 0;
            display:inline-block;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            background: linear-gradient(to bottom, #1b101f4D 0%, transparent 50%, #1b101f 100%);
          }
          .card-detail {
            font-size: 10px; 
          }
          .card-info {
            width: 200px;
            color: white;
            padding: 0 20px 30px;
            margin-top: -50px;
            z-index: 1;
            position: relative;
            letter-spacing: 0.03rem;
          }
          .card-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
            letter-spacing: 0.05rem;
            line-height: 1.1rem;
          }
          .card-rating {
            display: flex;
          }
          .card-average {
            font-size: 14px;
          }
        `}
      </style>
      <style>
        {`
          .card-image img{
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
          }
        `}
      </style>
    </>
  );
};

export default Card;
