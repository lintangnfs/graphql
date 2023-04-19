import client from "graphql/apollo-client";
import mFavorite from "./query";

const mutateFavorite = async (variables: {
  mediaId?: string
}) => {
  try {
    const data = await client.query({
      query: mFavorite,
      variables: variables
    });
    return data;
  } catch {
    return null;
  }
}

export default mutateFavorite;
