// Client-side
import gql from 'graphql-tag'

export const GET_USERS = gql`
  query users {
    users{
      email
      firstname
      lastname
      createdAt
      updatedAt
    }
  }
`

export const GET_USER = gql`
  query user ($email: String!) {
    user (email: $email) {
      email
      firstname
      lastname
      createdAt
      updatedAt
    }
  }
`

export const ADD_USER = gql`
  mutation addUser ($email: String!, $password: String!, $passwordConfirm: String!, $firstname: String!, $lastname: String!) {
    addUser (email: $email, password: $password, passwordConfirm: $passwordConfirm, firstname: $firstname, lastname: $lastname) {
      email
      token
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser ($email: String!, $firstname: String!, $lastname: String!) {
    updateUser (email: $email, firstname: $firstname, lastname: $lastname) {
      email
    }
  }
`

export const UPDATE_USER_PASSWORD = gql`
  mutation updateUser ($email: String!, $password: String!, $passwordConfirm: String!) {
    updateUser (email: $email, password: $password, passwordConfirm: $passwordConfirm) {
      email
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser (email: String!) {
    deleteUser (email: $email) {
      email
    }
  }
`
