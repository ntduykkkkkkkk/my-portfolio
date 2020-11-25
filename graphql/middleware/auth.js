const jwt = require('jsonwebtoken')
const { config } = require('../../config')
const { AuthenticationError } = require('apollo-server-express')

module.exports = (context) => {
    const header = context.req.headers.authorization
    if (header) {
        const token = header.split('Bearer ')[1]
        if (token) {
            try {
                const user = jwt.verify(token, config.secretKey)
                return user
            } catch (error) {
                throw new AuthenticationError(error)
            }
        }
        throw new AuthenticationError('You are not authorized to perform')
    }
    throw new AuthenticationError('You must be authenticated to perform this action')
}