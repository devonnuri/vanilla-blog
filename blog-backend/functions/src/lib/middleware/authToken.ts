import { auth } from 'firebase-admin';
import { Request, Response } from '../express';
import { decode } from '../token';

export default async (request: Request, response: Response, next: Function) => {
  const token = request.cookies['access_token'];
  console.log(token);

  if (!token) {
    request.user = null;
    response.sendStatus(401);
    return;
  }

  try {
    const decoded: any = await decode(token);
    console.log(decoded);
    const { user, exp } = decoded;

    request.user = user;
    request.tokenExpire = new Date(exp * 1000);
    next();
  } catch (e) {
    request.user = null;
    response.sendStatus(401);
  }
};
