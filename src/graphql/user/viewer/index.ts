import client from "graphql/apollo-client-with-auth";
import qViewer from "./query";

const getViewer = async (variables: {
 
}) => {
  try {
    const data = await client.query({
      query: qViewer,
      variables: variables
    });
    return data;
  } catch {
    return null;
  }
}

export default getViewer;
