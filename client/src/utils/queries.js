import { gql } from '@apollo/client';
export const GET_ME = gql`
  query me {
    me {
        username
        _id
        email
        bookCount
        savedBooks {
          bookId
          title
          authors
          image
          description
          link
        }
    }
  }
`;