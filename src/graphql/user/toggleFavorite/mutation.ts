
import { gql } from "@apollo/client";

const mFavorite = gql`
  mutation ($animeId: Int) {
    ToggleFavourite(animeId: $animeId) { 
      anime { 
          edges { 
              node { 
                  id
              } 
          } 
      } 
  } 
  }
`

export default mFavorite;