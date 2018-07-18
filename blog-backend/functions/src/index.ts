import * as functions from 'firebase-functions';
import { request } from 'https';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello World!');
});
