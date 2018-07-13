import Post from '../models/Post';

const resolvers = {
  Query: {
    post: async (_, args) => Post.find(args),
  },
  Mutation: {
    addPost: (_, args) => {
      const post = new Post({
        ...args,
        createdAt: new Date(),
      });
      post.save();
      return post;
    },
  },
};

export default resolvers;
