import { gql } from "@apollo/client";

const movieListQuery = gql`
  query Query($first: Int!, $after: String!) {
    allFilms(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          title
          id
          openingCrawl
          releaseDate
        }
      }
    }
  }
`;

export default movieListQuery;
