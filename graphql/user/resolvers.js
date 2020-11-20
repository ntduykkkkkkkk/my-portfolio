// Server-side
const User = require('./model')
const { UserInputError } = require('apollo-server-express')
const validator = require('./validator');

module.exports = {
  Query: {
    async users (_, context) {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      } catch (error) {
          throw new Error(error)
      }
    },
    async user(_, { email }, context){
      const user = await User.findOne({ email });
      if(user){
          return user
      }else{
          throw new UserInputError('User does not found');
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
      const user = await User.findOne({ email })
      if(!user) { 
        throw new UserInputError("User does not exists")
      }
      user.delete();
      return user
    }
  }
}
