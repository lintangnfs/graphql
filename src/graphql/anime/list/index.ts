import client from "graphql/apollo-client-cache";
import qAnimeList from "./query";

const getDataAnimeList = async (variables: {
  page?: number, perPage?: number, search?: string
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

export default getDataAnimeList;
