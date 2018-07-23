import { Request, Response } from '../../lib/express';
import { firestore } from 'firebase-admin';
import { hash, check } from '../../lib/crypto';
import { generate } from '../../lib/token';

const usersRef = firestore().collection('users');

export const register = (request: Request, response: Response) => {
  const { username, password } = request.body;
  usersRef
    .where('username', '==', username)
    .get()
    .then(async snapshot => {
      if (!snapshot.empty) {
        response.status(409).json({
          name: 'DUPLICATED_ACCOUNT',
          payload: username,
        });
        return;
      }

      usersRef.add({
        username,
        password: await hash(password),
      });
    });
};

export const login = (request: Request, response: Response) => {
  const { username, password } = request.body;
  usersRef
    .where('username', '==', username)
    .get()
    .then(async snapshot => {
      if (!snapshot.empty) {
        response.status(400).json({
          name: 'INVALID_CREDENTIALS',
        });
        return;
      }

      if (!check(snapshot.docs[0].data().password, password)) {
        response.status(400).json({
          name: 'INVALID_CREDENTIALS',
        });
        return;
      }

      response.cookie('access_token', await generate({ username }));
    });
};
