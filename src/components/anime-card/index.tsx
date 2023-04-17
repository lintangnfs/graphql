import React from "react";
import Image from "next/image";

interface CardProps {
  image: string;
  title: string;
  score: number;
  popularity: number;
}

const Card = (props: CardProps) => {
  return (
    <>
      <div className="card">
        <div className="card-image">

        </div>
        <div className="card-info">
          <div className="card-title"></div>
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
