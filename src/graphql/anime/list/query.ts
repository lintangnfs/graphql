
import { gql } from "@apollo/client";

const qAnimeList = gql`
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        native
        english
      }
      coverImage {
        large
      }
      genres
      popularity
      averageScore
    }
  }
}
`

export default qAnimeList;