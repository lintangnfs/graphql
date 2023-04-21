
import { gql } from "@apollo/client";

const mFavorite = gql`
  mutation ($animeId: Int) {
    ToggleFavourite(animeId: $animeId) { 
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
`

export default mFavorite;