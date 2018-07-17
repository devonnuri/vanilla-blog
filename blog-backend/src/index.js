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

const graphQLServer = new GraphQLServer({
  typeDefs,
  resolvers,
});

exists('.env')
  .then(isExists => (isExists ? readFile('.env', 'utf8') : null))
  .then((env) => {
    mongoose.connect(
      env || process.env.MONGO_URI,
      {
        useNewUrlParser: true,
      },
    );
  });

mongoose.connection.once('open', () => {
  console.log('[*] MongoDB Connected');
  graphQLServer.start(
    {
      playground: false,
      port: 8080,
    },
    () => {
      console.log('[*] GraphQL Server Started');
    },
  );
});
