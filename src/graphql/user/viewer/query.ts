
import { gql } from "@apollo/client";

const qViewer = gql`
query {
  Viewer {
    id
    name
  }
}
`

export default qViewer;