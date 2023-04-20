import React, { useState, useEffect, useRef, useCallback } from "react";
import { Animetype, PageOptType } from 'utils/constant';
import getDataUserFav from "graphql/user/favourites";
import { useIntersect } from "hooks/useIntersectionObserverHooks";
import List from "components/list";
import ListShimmer from "components/shimmer/list";

interface UserFavProps {
  options?: IntersectionObserverInit;
  isBookmark?: boolean;
}

const UserFav = (props: UserFavProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const { setNode, entry } = useIntersect(props.options);
  const [variables, setVariables] = useState({
    page: 1,
    perPage: 20,
  });
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState<Animetype[] | null | []>(null);
  const [notAutorized, setNotAutorized] = useState(false);

  const handleChange = useCallback(
		() => !loading ? setVariables((prev) => ({...prev, page: variables.page + 1})) : null,
		[loading, variables.page],
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

  
  useEffect(() => {


    const auth = localStorage.getItem("auth");
    const authJson = auth ? JSON.parse(auth) : null
    const id = authJson?.id

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDataUserFav({ id });
        if (data?.data) {
          const favorites = data.data.User.favourites.anime.edges;
          const anime = favorites.map((item: any) => {
            const { node } = item;
            return {...node}
          })
          setMedia(anime);
        }

      } catch {

      } finally {
        setLoading(false);
      }
    
    }

    if (id) {

      fetchData();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      setNotAutorized(true)
    }

	}, [variables]);

  const handleViewDetail = useCallback((id: string) => {
    window.location.href = `/anime/${id}`;
  }, [])

  const handleBackToHomepage = useCallback(() => {
    window.location.href = `/`;
  }, [])

  return (
    <>
        {
          media && !notAutorized && (
            <List data={media} handleViewDetail={handleViewDetail}/>
          )
        }
        {
          !loading && (!media || media.length < 1) && !notAutorized &&  (
            <div className="anime-content">
              <div className="anime-list">Your boormark is empty</div>
            </div>
          )
        } 
        {
          loading && !notAutorized &&  (
            <ListShimmer/>
          )
        } 
        {
          notAutorized && (
            <div style={{margin: "auto", width: 300, marginTop: 50}}>
              <h2 style={{ textAlign: "center" }}>Please login again to access this page</h2>
              <p
              style={{
                textAlign: "center",
                fontSize: 20, marginTop: 30,
                cursor: "pointer",
                color: "red"
              }}
              onClick={handleBackToHomepage}
              >
                Go to Homepage
              </p>
            </div>
          )
        }
        {/* <div ref={ref} style={{ height: 100 }}/> */}
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
        `}
      </style>
    </>
  );
};

export default UserFav;
