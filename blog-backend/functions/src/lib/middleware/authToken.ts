import { Request, Response } from '../express';
import { checkToken } from '../common';

export default async (request: Request, response: Response, next: Function) => {
  if (!(await checkToken(request))) {
    response.sendStatus(401);
  } else {
    next();
  }
};
