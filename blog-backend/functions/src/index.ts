import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { existsSync, readFileSync } from 'fs';

if (existsSync('.env')) {
  mongoose.connect(
    readFileSync('.env', 'utf8'),
    {
      useNewUrlParser: true,
    }
  );
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/posts/get', (request, response) => {
  response.json([
    {
      id: 1,
      title: 'Hello World!',
      body: 'WoWOWOW',
    },
    {
      id: 2,
      title: 'The Second Ppost',
      body: 'W0W0W0W0W',
    },
  ]);
});

export const api = functions.https.onRequest(app);
