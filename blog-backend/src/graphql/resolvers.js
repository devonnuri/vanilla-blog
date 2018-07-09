import Post from '../models/Post';
import User from '../models/User';

const resolvers = {
  Query: {
    user: async (_, args) => User.find(args),
  },
  Mutation: {
    addUser: (_, args) => {
      const user = new User({ ...args, createdAt: new Date() });
      user.save();
      return user;
    },
    addPost: (_, args) => {
      const post = new Post({ ...args, createdAt: new Date() });
      post.save();
      return post;
    },
  },
};

export default resolvers;
