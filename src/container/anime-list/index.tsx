import React, { useState, useEffect, useRef, useCallback } from "react";
import AnimeCard from "components/anime-card";
import { Animetype, PageOptType } from 'utils/constant';
import getDataAnimeList from "graphql/anime/list";
import { useIntersect } from "hooks/useIntersectionObserverHooks";

interface AnimeListProps {
  options?: IntersectionObserverInit;
}

const AnimeList = (props: AnimeListProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const { setNode, entry } = useIntersect(props.options);
  const [variables, setVariables] = useState({
    page: 1,
    perPage: 30,
  });
  const [loading, setLoading] = useState(true);
  const [pageOpt, setPageOpt] = useState<PageOptType | null>(null);
  const [media, setMedia] = useState<Animetype[] | null | []>(null);

  const handleChange = useCallback(
		() => pageOpt?.hasNextPage && !loading ? setVariables((prev) => ({...prev, page: variables.page + 1})) : null,
		[loading, variables.page, pageOpt?.hasNextPage],
	);

  useEffect(() => {
    if (ref.current) setNode(ref.current);
  }, [setNode]);

  useEffect(() => {
    if (entry?.isIntersecting && !loading) {
        setTimeout(() => {
          handleChange();
        }, 1000 );
      }
    }, [entry, props, loading, handleChange]);

  
  useEffect(() => {

    setLoading(true);

    const fetchData = async() => {

        try {
          const data = await getDataAnimeList(variables);
          const pageData = data && data.data.Page;
          const mediaNew = pageData.media;
          const pageInfo = pageData.pageInfo;
          setMedia((prev) => prev !== null ? [...prev, ...mediaNew] : []);
          setPageOpt(pageInfo);

        } catch {

        } finally {
          setLoading(false);
        }
    }

    fetchData();

	}, [variables]);

  const handleViewDetail = (id: string) => {
    window.location.href = `/anime/${id}`;
  }

  return (
    <>
      <div className="anime-content">
        <div className="anime-data">
          {
            media && media.map((item : Animetype, index) => 
            (
              <div 
                className="anime-list"
                key={`anime-list-${item?.id}`}
                onClick={() => handleViewDetail(item.id)}
              >
                <AnimeCard item={item}/>
              </div>
            ))
          }
        </div>
        <div ref={ref} style={{ height: 100 }}/>
      </div>
      <style jsx>
        {`
          .anime-content {
            min-width: 100vh;
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(5, 1fr);
          }
          .anime-data {
            min-height: 100vh;
          }
          .anime-list {
            width: 210px;
          }
          @media (max-width: 1070px) {
            .anime-content { 
              grid-template-columns: repeat(4, 1fr);
            }
          }
          @media (max-width: 629px) {
            .anime-content { 
              grid-template-columns: repeat(3, 1fr);
            }
          }
          @media (max-width: 419px) {
            .anime-content { 
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

export default AnimeList;
