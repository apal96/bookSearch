const { AuthenticationError } = require('apollo-server-express');
const { User,Book} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      //find single user by id or username
      me: async (parent, { _id,username }) => {
      const params = _id || username? { _id,username } : {};
      return User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    //   ?????
      saveBook: async (parent, {book}, context) => {
        if (context.user) {
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: {savedBooks: book } }
          );
  
          return savedBooks;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      deleteBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const book = await Book.findOneAndDelete({
            _id: bookId,
           
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
          );
  
          return book;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
  },
};

module.exports = resolvers;