import client from "graphql/apollo-client-with-auth";
import qAnimeList from "./query";

const getDataUserFav = async (variables: {
  id: string
}) => {
  try {
    const data = await client.query({
      query: qAnimeList,
      variables: variables
    });
    return data;
  } catch {
    return null;
  }
}

export default getDataUserFav;
