import { GraphQLServer } from 'graphql-yoga';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import resolvers from './graphql/resolvers';

config();

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
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
