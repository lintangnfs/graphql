import React from "react";
import Shimmer from "..";

interface ShimmerProps {
  
}

const DetailShimmer = (props: ShimmerProps) => {


  return (
    <>
      <div className="shimmer-detail">
        <div className="shimmer-detail-image">
          <Shimmer width="300px" height="calc(32/23 * 300px)" rounded="16px"/>
        </div>
        <div className="shimmer-detail-info">
          <div className="shimmer-detail-top">
            <div className="shimmer-detail-title" style={{marginBottom: 20}}>
              <Shimmer width="200px" height="60px" rounded="16px"/>
            </div>
            <div className="shimmer-detail-bookmark" >
            <Shimmer width="30px" height="50px" rounded="16px"/>
            </div>
          </div>
          <div className="shimmer-detail-attribute">
            <Shimmer width="100%" height="14px" rounded="16px"/>
            <div style={{ display: "flex", gap: "5px", alignItems: "center", marginTop: "40px", marginBottom: "40px" }}>
              <Shimmer width="100px" height="23px" rounded="16px" />
              <Shimmer width="20px" height="23px" rounded="16px"/>
            </div>
            <Shimmer width="300px" height="100px" rounded="16px"/>
          </div>
        </div>
      </div>
      <style jsx>
      {`
          .shimmer-page {
            min-width: 100vw;
            width: 100vw;
            min-height: 100vh;
            height: max-content;
            display: flex;
          }
          .shimmer-detail {
            gap: 25px;
            width: 100%;
            display: flex;
            min-height: 100vh;
            height: max-content;
            align-items: center;
            justify-content: center;
          }
          .shimmer-detail-image {
            position: relative;
          }
          .shimmer-detail-info {
            color: white;
            font-family: 'Nunito', sans-serif;
            max-width: 500px;
          }
          .shimmer-detail-title {
            font-weight: 600;
            letter-spacing: 0.05rem;
          }
          .shimmer-detail-bookmark {
            cursor: pointer;
          }
          .shimmer-detail-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          .shimmer-detail-attribute {
            letter-spacing: 0.03rem;
            font-size: 12px;
          }
          .shimmer-detail-genre {
            margin-bottom: 20px;
          }
          .empty-check {
            margin-top: 20px;
            letter-spacing: 0.28rem;
          }
          .shimmer-detail-bookmark span {
            font-size: 2em;
          }
          @media (max-width: 880px) {
            .shimmer-detail-info {
              color: white;
              font-family: 'Nunito', sans-serif;
              max-width: 300px;
            }
          }
          @media (max-width: 600px) {
            .shimmer-detail {
              padding: 40px 8vw 10vh;
              display: block;
            }
            .shimmer-detail * {
              margin: inherit auto;
            }
            .shimmer-detail-info {
              margin: 30px auto;
            }
          }
          @media (max-width: 600px) {
            .shimmer-detail-image .image-wrapper {
              margin: auto;
            }
           }
           @media (max-width: 500px) {
            .shimmer-detail-image div {
              width: 83.5vw;
              height: calc(3/2 * 83.5vw);
            }
            .shimmer-detail-image {
              margin: auto;
            }
            .shimmer-detail-image div  {
              border-radius: 16px;
            }
          }
        `}
      </style>
    </>
  )

}

export default DetailShimmer