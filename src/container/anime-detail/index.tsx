import React, { useState, useEffect } from "react";
import { Animetype } from 'utils/constant';
import getDataAnimeDetail from "graphql/anime/detail";
import AnimeImage from "components/anime-image";

interface AnimeDetailProps {
  options?: IntersectionObserverInit;
  dataId?: string;
}

const AnimeDetail = (props: AnimeDetailProps) => {

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Animetype | null>(null);

  
  useEffect(() => {

    setLoading(true);

    const fetchData = async() => {

        try {

          const data = await getDataAnimeDetail({id: props.dataId});
          const detailData = data && data.data.Media;
          setDetail(detailData);

        } catch {

        } finally {
          setLoading(false);
        }
    }

    fetchData();

	}, [props.dataId]);

  const title = detail?.title;

  return (
    <>
      <div className="anime-detail">
        <div className="anime-detail-image">
          {
            detail?.coverImage?.large && 
            <AnimeImage src={detail.coverImage.large}/>
          }
        </div>
        <div className="anime-detail-info">
          <div className="anime-detail-title">
            {title?.english &&  <p className="anime-detail-title english">{title.english}</p>}
            {title && title.native?.toLowerCase() !== title.english?.toLowerCase() && 
              <p className="anime-detail-title native">{title.native}</p>
            }
          </div>
          <div className="anime-detail-attribute">
            <div>{detail?.genres?.join(" | ")}</div>
            <div>{detail?.averageScore}</div>
            <div>{detail?.popularity}</div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .anime-detail {
            width: 100%;
            height: 100vh;
          }
        `}
      </style>
    </>
  );
};

export default AnimeDetail;
