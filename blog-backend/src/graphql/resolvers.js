import Post from '../models/Post';
import User from '../models/User';

const resolvers = {
  Query: {
    user: async (_, args) => User.find(args),
    post: async (_, args) => Post.find(args),
  },
  Mutation: {
    addUser: (_, args) => {
      const user = new User({ ...args, createdAt: new Date() });
      user.save();
      return user;
    },
    addPost: (_, { title, body, author }) => {
      const post = new Post({
        title,
        body,
        author,
        createdAt: new Date(),
      });
      post.save();
      return post;
    },
  },
};

export default resolvers;
