import { GraphQLServer } from 'graphql-yoga';
import mongoose from 'mongoose';

import resolvers from './graphql/resolvers';

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers,
});

mongoose.connect(
  'mongodb://localhost:27017/admin',
  { useNewUrlParser: true },
);

mongoose.connection.once('open', () => {
  console.log('[*] Database Connected');

  server.start(() => {
    console.log('[*] GraphQL Server Started');
  });
});
