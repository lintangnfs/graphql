import client from "graphql/apollo-client-cache";
import qAnimeDetail from "./query";

const getDataAnimeDetail = async (variables: {
  id?: string
}) => {
  try {
    const data = await client.query({
      query: qAnimeDetail,
      variables: variables
    });
    return data;
  } catch {
    return null;
  }
}

export default getDataAnimeDetail;
