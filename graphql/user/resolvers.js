// Server-side
const User = require('./model')

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
          throw new Error('User does not found');
      }
  }
  },

  Mutation: {
    async addUser (_, { firstname, lastname, email, password }, context, info) {
      const user = await User.findOne({ email });
      if(user){
        throw new Error('Email already exists');
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
      const user = await User.findOne({ email });
      if(user){
        throw new Error('Email already exists');
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
        const result = await newUser.save()
        return result
      } catch (error) {
          throw new Error(error)
      }
    },

    async deleteUser (_, { email }, context) {
      try{
        const user = await User.findOne({ email })
        if(user){
          user.delete();
          return user
        }else{
          return 'User does not exist123'
        }             
      }catch(error){
          throw new Error("123123", error)
      }
    }
  }
}
