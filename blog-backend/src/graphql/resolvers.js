import Post from '../models/Post';

const resolvers = {
  Query: {
    post: async (_, args) => Post.find(args),
  },
  Mutation: {
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
