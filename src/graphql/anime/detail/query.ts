
import { gql } from "@apollo/client";

const qAnimeDetail = gql`
query ($id: Int) {
  Media (id: $id, type: ANIME) {
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
    bannerImage
    description
    isFavourite
  }
}
`

export default qAnimeDetail;