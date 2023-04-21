import client from "graphql/apollo-client-cache";
import mFavorite from "./mutation";
import qAnimeDetail from "graphql/anime/detail/query";

const mutateFavorite = async (variables: {
  animeId?: string
}) => {
  try {
    const data = await client.mutate({
      mutation: mFavorite,
      variables: variables,
      refetchQueries: [
        { query: qAnimeDetail, variables: { id: variables.animeId } }
      ],
      optimisticResponse: {
        ToggleFavourite: {
          id: -1,
          __typename: 'Favourite',
          tasks: [],
          anime: {
            edges: {
              node: {
                id: "",
                title: {
                  native : "",
                  english : ""
                },
                coverImage: {
                  large : ""
                },
                genres: [],
                popularity: 0,
                averageScore: 0,
                isFavourite: false
               
              }
            }
          },
          ...variables,
        },
      },
      context: {
        serializationKey: 'TOGGLE_FAVOURITE',
      },
    });

    return data;

  } catch {
    return null;
  }
}

export default mutateFavorite;
