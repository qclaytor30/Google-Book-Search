import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                username
              _id
              email
              bookCount
              savedBooks {
                bookId
                title
                authors
                description
                image
                link
              } 
            }
        }
    }
`;