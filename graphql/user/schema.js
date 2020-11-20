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
    addUser(email: String!, firstname: String, lastname: String, password: String!, createdAt: String, updatedAt: String): User!
    updateUser(id: ID!, firstname: String, lastname: String, password: String, updatedAt: String): User
    deleteUser(email: String): User
  }
`
