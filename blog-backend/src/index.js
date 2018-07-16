import 'babel-polyfill';

import { GraphQLServer } from 'graphql-yoga';
import mongoose from 'mongoose';

import { exists, readFile } from 'mz/fs';
import resolvers from './graphql/resolvers';

const typeDefs = `
scalar Date

type Post {
  id: Int!
  title: String!
  body: String!
  createdAt: Date!
}

type Query {
  post(id: Int, title: String, body: String): [Post]!
}

type Mutation {
  addPost(title: String!, body: String!): Post
}
`;

exists('../.env')
  .then(isExists => (isExists ? readFile('../.env') : null))
  .then((env) => {
    process.env.MONGO_SERVER = env;
  });

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

mongoose.connect(
  process.env.MONGO_SERVER,
  { useNewUrlParser: true },
);

mongoose.connection.once('open', () => {
  console.log('[*] Database Connected');
  server.start(() => {
    console.log('[*] GraphQL Server Started');
  });
});
