import client from "graphql/apollo-client-with-auth";
import mFavorite from "./mutation";

const mutateFavorite = async (variables: {
  animeId?: string
}) => {
  try {
    const data = await client.mutate({
      mutation: mFavorite,
      variables: variables
    });
    return data;
  } catch {
    return null;
  }
}

export default mutateFavorite;
