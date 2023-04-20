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
      <style>
        {`
          .shine {
            background: #dbdbdb;
            background-image: linear-gradient(to right, #dbdbdb 0%, #edeef1 20%, #dbdbdb 40%, #dbdbdb 100%);
            background-repeat: no-repeat;
            display: inline-block;
            position: relative; 
            -webkit-animation-duration: 1s;
            -webkit-animation-fill-mode: forwards; 
            -webkit-animation-iteration-count: infinite;
            -webkit-animation-name: placeholderShimmer;
            -webkit-animation-timing-function: linear;
          }

          @-webkit-keyframes placeholderShimmer {
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