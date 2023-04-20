import React from "react";
import Shimmer from "..";

interface ShimmerProps {
  
}

const ListShimmer = (props: ShimmerProps) => {

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <>
      <div className="content">
        {
          array.map((item: number) =>  <Shimmer key={`list-shimmer-${String(item)}`} width="200px" height="400px" rounded="16px"/>)
        }
      </div>
      <style>
        {`
          .content {
            max-width: 1050px;
            margin: 0 auto;
            display: grid;
            gap: 15px;
            grid-template-columns: repeat(5, 1fr);
            justify-items: center;
          }
          @media (max-width: 1050px) {
            .content { 
              grid-template-columns: repeat(4, 1fr);
            }
          }
          @media (max-width: 840px) {
            .content { 
              grid-template-columns: repeat(3, 1fr);
            }
          }
          @media (max-width: 620px) {
            .content { 
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 420px) {
            .content { 
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  )

}

export default ListShimmer