import Post from '../models/Post';

const resolvers = {
  Query: {
    post: async (_, args) => Post.find(args),
  },
  Mutation: {
    addPost: async (_, args) => {
      const lastPost = (await Post.findOne(
        {},
        {},
        {
          sort: {
            createdAt: -1,
          },
        },
      )) || { id: 0 };

      const post = new Post({
        id: lastPost.id + 1,
        ...args,
        createdAt: new Date(),
      });
      post.save();
      return post;
    },
  },
};

export default resolvers;
