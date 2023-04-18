import client from "graphql/apollo-client";
import qAnimeDetail from "./query";

const getDataAnimeDetail = async (variables: {
  id?: string | null;
}) => 
{
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
