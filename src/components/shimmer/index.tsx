import React from "react";

interface ShimmerProps {
  width: string,
  height: string,
  rounded?: string;
}

const Shimmer = (props: ShimmerProps) => {

  const { rounded, width, height } = props;
  
  return (
    <>
      <div className="shine" style={{width, height, borderRadius: `${rounded ?? 0}`}} />
      <style jsx>
        {`
          .shine {
            background: #dbdbdb;
            background-image: linear-gradient(to right, #dbdbdb 0%, #edeef1 20%, #dbdbdb 40%, #dbdbdb 100%);
            background-repeat: no-repeat;
            display: inline-block;
            position: relative; 
            animation-duration: 1s;
            animation-fill-mode: forwards; 
            animation-iteration-count: infinite;
            animation-name: placeholderShimmer;
            animation-timing-function: linear;
          }

          @keyframes placeholderShimmer {
            0% {
              background-position: -468px 0;
            }
            
            100% {
              background-position: 468px 0; 
            }
          }
        `}
      </style>
    </>
  )

}

export default Shimmer