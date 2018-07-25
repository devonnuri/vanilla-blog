import * as functions from 'firebase-functions';
import * as express from 'express';
import { initializeApp } from 'firebase-admin';
import { config } from 'dotenv';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import authToken from './lib/middleware/authToken';

initializeApp();

import Router from './routes';

config();

const app = express();

app.use(
  cors({
    origin: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', Router);

export const api = functions.https.onRequest(app);
