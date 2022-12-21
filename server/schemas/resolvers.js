const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async () => {
            return User.find({});
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
        }
    },
};

module.exports = resolvers;