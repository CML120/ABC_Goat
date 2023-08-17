const Word = require("../models/Word");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Contact = require("../models/Contact");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const userData = await User.findById(context.user._id).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },
    getWord: async (_, { id }) => {
      try {
        return await Word.findById(id);
      } catch (error) {
        throw new Error("Error fetching word");
      }
    },
    getWordsByDifficulty: async (_, { level }) => {
      try {
        return await Word.find({ level: parseInt(level) });
      } catch (error) {
        throw new Error("Error fetching words");
      }
    },
    getUserByUsername: async (_, { username }) => {
      try {
        return await User.findOne({ username });
      } catch (error) {
        throw new Error("Error fetching user by username");
      }
    },
    getProfile: async (_, { username }) => {
      try {
        return await Profile.findOne({ user: username });
      } catch (error) {
        throw new Error("Error fetching profile");
      }
    },
    userByEmail: async (_, { email }) => {
      try {
        return await User.findOne({ email });
      } catch (error) {
        throw new Error("Error fetching user by email");
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect login credentials!");
      }

      const correctPW = await user.isCorrectPassword(password);
      if (!correctPW) {
        throw new AuthenticationError("Incorrect login credentials!");
      }
      const token = signToken(user);
      return { token, user };
    },

    updatePlayerLevel: async (_, { userId, newLevel }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { level: newLevel },
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        throw new Error("Failed to update player level");
      }
    },

    addWord: async (_, { word, difficulty, meaning }) => {
      try {
        const newWord = new Word({
          word,
          difficulty: parseInt(difficulty), // Parse difficulty to an integer
          meaning,
        });
        return await newWord.save();
      } catch (error) {
        throw new Error("Error adding word");
      }
    },
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password, level: 1 }); // Set the starting level to 1
      const token = signToken(user);
      return { token, user };
    },
    userById: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error("Error fetching user by ID");
      }
    },
   
    deleteUserById: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findByIdAndDelete(context.user._id)
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },

    submitContactForm: async (_, { input }) => {
      try {
        const addContact = new Contact({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          message: input.message,
        });
        await addContact.save();
        return {
          success: true,
          message: "Form submitted successfully.",
        };
      } catch (error) {
        console.error("Error saving Contact message", error);
        return {
          success: false,
          message: "Failed to submit. Please try again!",
        };
      }
    },
  },
};

module.exports = resolvers;
