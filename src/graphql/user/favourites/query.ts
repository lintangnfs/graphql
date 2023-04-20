
import { gql } from "@apollo/client";

const qAnimeList = gql`
query ($id: Int) {
  User (id: $id) {
    id
    name
    favourites {
      anime { 
        edges { 
            node { 
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
              isFavourite
            } 
        } 
      } 
    }
  }
}
`

export default qAnimeList;