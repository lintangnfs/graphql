import React from "react";
import Image from "next/image";

interface AnimeImageProps {
  src: string;
  width?: string | "200px";
  rounded?: boolean;
}

const AnimeImage = (props: AnimeImageProps) => {
  return (
    <>
      <div className="image-wrapper">
        <Image
          fill
          className="img-representative"
          src={props.src}
          alt="Anime cover"
          loading="eager"
        />
      </div>
      <style jsx>
        {`
          .image-wrapper {
            position: relative;
            width: ${props.width ?? "200px"};
            height: calc(32/23 * ${props.width ?? "200px"})
          }
        `}
      </style>
    </>
  );
};

export default AnimeImage;
