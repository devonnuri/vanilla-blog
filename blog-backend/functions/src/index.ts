import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { config } from 'dotenv';

import Posts from './routes/posts/';

config();

mongoose.connect(process.env.MONGODB).catch(err => {
  console.error(err);
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/posts', Posts);

export const api = functions.https.onRequest(app);
