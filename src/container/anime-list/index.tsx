import React, { useState, useEffect, useRef, useCallback } from "react";
import { Animetype, PageOptType } from 'utils/constant';
import getDataAnimeList from "graphql/anime/list";
import { useIntersect } from "hooks/useIntersectionObserverHooks";
import List from "components/list";
import ListShimmer from "components/shimmer/list";

interface AnimeListProps {
  options?: IntersectionObserverInit;
  isBookmark?: boolean;
}

const AnimeList = (props: AnimeListProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const { setNode, entry } = useIntersect(props.options);
  const [variables, setVariables] = useState({
    page: 1,
    perPage: 20,
  });
  const [search, setSearch] = useState<string>("");
  const [genreList, setGenreList] = useState([]);
  const [genre, setGenre] = useState("");
  const [openGenre, setOpenGenre] = useState(false)
  const [loading, setLoading] = useState(true);
  const [pageOpt, setPageOpt] = useState<PageOptType | null>(null);
  const [media, setMedia] = useState<Animetype[] | null | []>(null);

  const handleChange = useCallback(
    () => pageOpt?.hasNextPage && !loading
      ? setVariables((prev) => ({ ...prev, page: variables.page + 1 })) : null,
		[loading, variables.page, pageOpt?.hasNextPage],
  );

  useEffect(() => {
    if (ref.current) setNode(ref.current);
  }, [setNode]);

  useEffect(() => {
    if (entry?.isIntersecting && !loading) {
        setTimeout(() => {
          handleChange();
        }, 500 );
      }
  }, [entry, props, loading, handleChange]);
  
  const fetchData = useCallback(async () => {

    try {

      let variableNew : any = {...variables};

      if (search && search.length > 0) {

        variableNew = {...variableNew, search}
      }

      if (genre && genre.length > 0) {

        variableNew = {...variableNew, genre}
      }

      const data = await getDataAnimeList(variableNew);
      const pageData = data && data?.data?.Page;
      const mediaNew = pageData?.media;
      const pageInfo = pageData?.pageInfo;
      const genres = data?.data?.GenreCollection;
      return {mediaNew, pageInfo, genres};

    } catch {

    } finally {
      setLoading(false);
    }
  }, [variables, search, genre] ) 

  useEffect(() => {

    setLoading(true);
    setOpenGenre(false)

    fetchData().then((res: any) => {
      if (res.mediaNew && res.mediaNew.length > 0) {
        setMedia((prev) => prev !== null && variables.page !== 1  ? [...prev, ...res.mediaNew] : res.mediaNew);
        setPageOpt(res.pageInfo);
        setGenreList(res.genres ?? []);
      }
    });

  }, [variables, fetchData]);

  useEffect(() => {

    setLoading(true);
    setTimeout(() => {
      setVariables((prev) => ({ ...prev, page: 1}))
    }, 100 );
  }, [search, genre, setVariables]);
  

  const handleViewDetail = useCallback((id: string) => {
    window.location.href = `/anime/${id}`;
  }, [])

  const handleSearch = (e: any) => setSearch(e.target.value)
  const handleReset = () => {
    setSearch("");
    setGenre("")
  }
  return (
    <>
      <div className="anime-toolbox">
        <div className="anime-genre-wrapper" style={{position: "relative"}}>
          <div className="anime-tool" style={{cursor: "pointer", color: "#1b101f"}} onClick={() => setOpenGenre(!openGenre)}>
            {genre?.length > 0 ? genre : `Genre`}
          </div>
          {
            openGenre && (
            <div className="anime-genre">
              {
                genreList.map((item: any, index: number) =>
                  <div
                    key={`anime-genre-item-${String(index)}`}
                    className="anime-genre-item"
                    onClick={()=> setGenre(item)}
                  >
                    {item}
                  </div>
                )
              }
            </div>
            )
          }
        </div>
        <div>
          <input
            className="anime-search-input"
            placeholder="Cari anime..."
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className="anime-tool" onClick={handleReset}>Reset</div>
      </div>
        {
          media && (
            <List data={media} handleViewDetail={handleViewDetail}/>
          )
        }
        {
          loading && (
            <ListShimmer/>
          )
        } 
        <div ref={ref} style={{ height: 100 }}/>
      <style jsx>
        {`
          .anime-shimmer {
            min-width: 100vw;
            height: 100vh;
          }
          .anime-content {
            max-width: 1050px;
            margin: 0 auto;
            display: grid;
            gap: 15px;
            grid-template-columns: repeat(5, 1fr);
          }
          .anime-list {
            width: 100%;
            width: 200px;
            display: flex;
          }
          .anime-toolbox {
            gap: 10px;
            display: flex;
            margin-top: 10px;
            margin-bottom: 20px;
            justify-content: end;
            align-items: center;
          }
          .anime-search-input{
            min-width: 300px;
            width: 100%;
						font-size: 14px;
						padding: 6px 8px;
						border-radius: 16px;
						text-decoration: none;
						outline: none !important;
						transition: 300ms box-shadow;
						border: solid 1px rgba(0, 0, 0, .2);
						box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            text-decoration: none;
          }
          .anime-genre {
            position: absolute;
            z-index: 5;
            background-color: white;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
            min-width: 100%;
            width: max-content;
            border-radius: 16px;
          }
          .anime-genre .anime-genre-item {
            cursor: pointer;
            padding: 2px 10px;
            color: #1b101f;
          }
          .anime-genre .anime-genre-item:hover {
            color: white;
            background-color: black;
          }
          @media (max-width: 600px) {
            .anime-toolbox { 
              width: 100%;
              flex-direction: column;
              justify-content: center;
            }
          }
        `}
      </style>
      <style>
        {`
          .anime-tool {
            cursor: pointer;
            border-radius: 20px;
            border: solid 1px #1b101f;
            padding: 2px 10px;
            color: #1b101f;
            text-align: center;
            align-self: center;
          }
          @media (max-width: 600px) {
            .anime-genre-wrapper,
            .anime-tool { 
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>
    </>
  );
};

export default AnimeList;
