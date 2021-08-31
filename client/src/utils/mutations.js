import { gql } from '@apollo/client';

export const LOGIN_USER= gql`
mutation  login($email: String!, $password: String!){
    login(email:$email, password:$password){
      token
      user{
        email
      }
    }
  }
`;


export const ADD_USER= gql`
mutation createUser($username: String!,$email: String!, $password: String!) {
    createUser(username:$username, email:$email,password:$password){
      token
      user{
          username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
deleteBook(bookId: ID!): User
mutation deleteBook($book: BookInput!) {
    deleteBook(book: $book) {
      _id
      username
      email
      deleteBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;