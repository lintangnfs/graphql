
import { gql } from "@apollo/client";

const mFavorite = gql`
  mutation ($mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry (mediaId: $mediaId, status: $status) {
      id
      status
    }
  }
`

export default mFavorite;