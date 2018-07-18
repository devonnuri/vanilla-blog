import * as functions from 'firebase-functions';
import * as express from 'express';

const app = express();

app.get('/get', (request, response) => {
  response.json([
    {
      id: 1,
      title: 'Hello World!',
      body: 'WoWOWOW',
    },
    {
      id: 2,
      title: 'Hello World!',
      body: 'WoWOWOW',
    },
  ]);
});

export const post = functions.https.onRequest(app);
