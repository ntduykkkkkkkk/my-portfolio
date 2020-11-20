// Server-side
module.exports = `
  # This "Article" type can be used in other type declarations
  type User {
    id: ID
    email: String
    password: String
    firstname: String
    lastname: String
    createdAt: String
    updatedAt: String
  }

  # Queries
  type Query {
    users(sort: String): [User]
    user(id: ID, email: String): User
  }

  # Mutations
  type Mutation {
    addUser(email: String!, firstname: String, lastname: String, password: String!, passwordConfirm: String!, createdAt: String, updatedAt: String): User!
    updateUser(email: String!, firstname: String, lastname: String, password: String): User
    deleteUser(email: String!): User
  }
`
