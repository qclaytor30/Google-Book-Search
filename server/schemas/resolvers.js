const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You must log in');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Can't find user!");
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw new AuthenticationError('Something went wrong!');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { input }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id }, { $addToSet: { savedBooks: input } },{ new: true, runValidators: true }
            );
            return updatedUser;
        }
    },
    removeBook: async (parent, { bookId }, context) => {
        const updatedUser = await User.findOneAndUpdate( { _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true });
        if (!updatedUser) {
            throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
     }
};

module.exports = resolvers;