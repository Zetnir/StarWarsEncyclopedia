import { gql } from "@apollo/client";

const characterDetailsQuery = gql`
  query CharacterDetailsQuery($id: ID!) {
    person(id: $id) {
      name
      birthYear
      height
      mass
      homeworld {
        name
      }
      filmConnection {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            title
            id
          }
        }
      }
    }
  }
`;

export default characterDetailsQuery;
