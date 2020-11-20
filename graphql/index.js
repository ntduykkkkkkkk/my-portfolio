const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

module.exports.typeDefs = mergeTypeDefs([
  require('./user/schema')
])

module.exports.resolvers = mergeResolvers([
  require('./user/resolvers')
])
