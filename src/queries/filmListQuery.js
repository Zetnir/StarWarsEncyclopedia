import { gql } from "@apollo/client";

const filmListQuery = gql`
  query Query {
    allFilms {
      films {
        id
        title
        releaseDate
        characterConnection {
          characters {
            name
          }
        }
      }
    }
  }
`;

export default filmListQuery;
