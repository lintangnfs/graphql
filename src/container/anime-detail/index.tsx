import React, { useState, useEffect } from "react";
import { Animetype } from 'utils/constant';
import getDataAnimeDetail from "graphql/anime/detail";
import mutateFavorite from "graphql/user/toggleFavorite";
import AnimeImage from "components/image";
import Rating from "components/rating";
import DOMPurify from "dompurify";

interface AnimeDetailProps {
  options?: IntersectionObserverInit;
  dataId?: string;
}

const AnimeDetail = (props: AnimeDetailProps) => {

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Animetype | null>(null);
  const sanitizedDescription = detail?.description ? DOMPurify.sanitize(detail.description) : null;

  
  useEffect(() => {

    setLoading(true)

    const fetchData = async() => {

        try {

          const data = await getDataAnimeDetail({id: props.dataId});
          const detailData = data && data.data.Media;
          setDetail(detailData);

        } catch(err) {
          console.log(err)
        } finally {
          setLoading(false);
        }
    }

    fetchData();

  }, [props.dataId]);
  
  const handleBookmark = async () => {
    
    try {

      const data = await mutateFavorite({ animeId: props.dataId });
      if (data?.data?.ToggleFavourite) {
        window.location.href = `/anime/${props.dataId}`;
      }
    } catch {

    } finally {
      setLoading(false);
    }
  }

  const title = detail?.title;
  const titleShown = title?.english ?? title?.native

  return (
    <div>
      <div className="anime-page">
        {
          detail && (
            <div className={`anime-detail ${detail?.bannerImage ? "banner" : "non-banner"}`}>
              <div className="anime-detail-image">
                {
                  detail?.coverImage?.large && 
                    <AnimeImage
                      width="300px"
                      src={detail.coverImage.large}
                    />
                }
              </div>
              <div className="anime-detail-info">
                <div className="anime-detail-top">
                  <div className="anime-detail-title">
                    {titleShown &&  <h1 className="anime-detail-title">{titleShown}</h1>}
                  </div>
                  <div className="anime-detail-bookmark" onClick={handleBookmark}>
                    <span className={`material-symbols-rounded ${detail?.isFavourite ? "active" : "deactive"}`}>bookmark</span>
                  </div>
                </div>
                <div className="anime-detail-attribute">
                  <div className="anime-detail-genre">{detail?.genres?.join(" | ")}</div>
                  {
                    detail?.averageScore && (
                      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <Rating rating={detail.averageScore / 20} total={5} />
                        <div className="anime-detail-average">{`(${detail.averageScore})`}</div>
                        </div>
                    )
                  }
                  {
                    sanitizedDescription &&  <p className="anime-detail-description" dangerouslySetInnerHTML={{ __html: sanitizedDescription }}/>
                  }
                
                </div>
              </div>
            </div>
          )
        }
        {
          !detail && !loading && (
            <div className="anime-detail">
              <div>
                <h1 style={{ color: "white" }}>Oops, data not found</h1>
                <p className="empty-check" style={{color: "white"}}>Please check another data :)</p>
              </div>
            </div>
          )
        }
      </div>
      <style jsx>
        {`
          .anime-page {
            min-width: 100vw;
            width: 100vw;
            min-height: 100vh;
            height: max-content;
            display: flex;
            background-color: #1b101f;
          }
          .anime-detail {
            gap: 25px;
            width: 100%;
            display: flex;
            min-height: 100vh;
            height: max-content;
            align-items: center;
            justify-content: center;
          }
          .anime-detail.banner {
            background-repeat: no-repeat;
            background-image: linear-gradient(to bottom,
              transparent 0%,
              #1b101f 55%), url(${detail?.bannerImage});
            background-color: #1b101f;
            background-position-x: center;
          }
          .anime-detail.non-banner {
            background: #1b101f;
          }
          .anime-detail-image {
            position: relative;
          }
          .anime-detail-image:after {
            content:'';
            position: absolute;
            left:0; 
            top:0;
            width:100%; 
            height:100%;
            z-index: 0;
            display: inline-block;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
          }
          .anime-detail-info {
            color: white;
            font-family: 'Nunito', sans-serif;
            max-width: 500px;
          }
          .anime-detail-title {
            font-weight: 600;
            margin-bottom: 5px;
            letter-spacing: 0.05rem;
          }
          .anime-detail-bookmark {
            cursor: pointer;
          }
          .anime-detail-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .anime-detail-attribute {
            letter-spacing: 0.03rem;
            font-size: 12px;
          }
          .anime-detail-genre {
            margin-bottom: 20px;
          }
          .empty-check {
            margin-top: 20px;
            letter-spacing: 0.28rem;
          }
          .anime-detail-bookmark .active {
            color: #e19725;
          }
          .anime-detail-bookmark .deactive {
            color: white;
          }
          .anime-detail-bookmark span {
            font-size: 2em;
          }
          @media (max-width: 500px) {
            .anime-detail {
              padding: 40px 8vw 10vh;
              display: block;
            }
            .anime-detail-info {
              margin-top: 30px;
            }
            .anime-detail.banner {
              background-image: linear-gradient(to bottom,
                transparent 0%,
                #1b101f 30%), url(${detail?.bannerImage});
            }
          }
        `}
      </style>
      <style>
        {`
           @media (max-width: 500px) {
            .anime-detail-image .image-wrapper {
              width: 83.5vw;
              height: calc(3/2 * 83.5vw);
            }
            .anime-detail-image {
              margin: auto;
            }
            .anime-detail-image img  {
              border-radius: 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimeDetail;
