import * as functions from 'firebase-functions';
import * as express from 'express';
import { initializeApp } from 'firebase-admin';
import { config } from 'dotenv';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import authToken from './lib/middleware/authToken';

initializeApp();

import Posts from './routes/posts';

config();

const app = express();

app.use(
  cors({
    origin: true,
  })
);
app.use(cookieParser());
app.use(authToken);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/posts', Posts);

export const api = functions.https.onRequest(app);
