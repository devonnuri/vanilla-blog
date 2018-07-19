import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { existsSync, readFileSync } from 'fs';

import Posts from './routes/Posts';

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

app.use('/posts', Posts);

export const api = functions.https.onRequest(app);
