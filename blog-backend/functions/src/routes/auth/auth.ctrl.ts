import { Request, Response } from '../../lib/express';
import { firestore } from 'firebase-admin';

const usersRef = firestore().collection('users');

export const register = (request: Request, response: Response) => {
  const { username, password } = request.body;
  usersRef
    .where('username', '==', username)
    .get()
    .then(snapshot => {
      if (!snapshot.empty) {
        response.status(409).json({
          name: 'DUPLICATED_ACCOUNT',
          payload: username,
        });
        return;
      }

      usersRef.add({
        username,
      });
    });
};
