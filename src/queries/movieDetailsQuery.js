import { gql } from "@apollo/client";

const movieDetailsQuery = gql`
  query MovieDetailsQuery($id: ID!, $first: Int!, $after: String!) {
    film(id: $id) {
      title
      releaseDate
      openingCrawl
      speciesConnection {
        totalCount
      }
      vehicleConnection {
        totalCount
      }
      planetConnection {
        totalCount
      }
      characterConnection(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;

export default movieDetailsQuery;
