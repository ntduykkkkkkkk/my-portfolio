// Server-side
const User = require('./model')
const { UserInputError } = require('apollo-server-express')
const validator = require('./validator')
const checkAuth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { config } = require('../../config')

function generateToken(user) {
  return jwt.sign({ 
    id: user.id,
    email: user.email,
  }, config.secretKey, { expiresIn: '15m'})
}

module.exports = {
  Query: {
    async users () {
      try {
        const users = await User.find().sort({ createdAt: -1 })
        return users;
      } catch (error) {
          throw new Error(error)
      }
    },
    async user(_, { email }, context){
      const permissions = checkAuth(context)
      const user = await User.findOne({ email })
      if(user){
          return user
      }else{
          throw new UserInputError('User does not found')
      }
    }
  },

  Mutation: {
    async addUser (_, { firstname, lastname, email, password, passwordConfirm }, context, info) {
      const { error } = validator.add({ firstname, lastname, email, password, passwordConfirm })
      if (error) {
        throw new UserInputError(error.details[0].message)
      }
      const user = await User.findOne({ email });
      if(user){
        throw new UserInputError('Email already exists');
      }
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        firstname,
        lastname,
        password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      try {
        const result = await newUser.save();
        return result
      } catch (error) {
          throw new Error(error)
      }
    },

    async updateUser (_, { firstname, lastname, email, password }, context, info) {
      const permissions = checkAuth(context)
      try {
        const user = await User.findOne({ email });
        if(!user){
          throw new UserInputError('User does not exists');
        }
        const newUser = await User.findByIdAndUpdate(user.id,{
          firstname,
          lastname,
          password,
          updatedAt: new Date().toISOString(),
        }, {new: true})
        return newUser
      } catch (error) {
          throw new Error(error)
      }
    },

    async deleteUser (_, { email }, context) {
      const permissions = checkAuth(context)
      const user = await User.findOne({ email })
      if(!user) { 
        throw new UserInputError("User does not exists")
      }
      user.delete();
      return user
    },
    
    async login(_, { email, password }) {
      const { error } = validator.login({ email, password })
      if (error) {
        throw new UserInputError(error.details[0].message)
      }
      const user = await User.findOne({ email })
      if (!user) {
        throw new UserInputError('User does not exists')
      }
      const matchPassword = await bcrypt.compare(password, user.password)
      if (!matchPassword) {
        throw new UserInputError('User does not exists')
      }
      const token = generateToken(user)
      return { ...user._doc, id: user._id, token }
    }
  }
}
