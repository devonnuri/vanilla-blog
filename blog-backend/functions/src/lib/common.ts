import * as Joi from 'joi';
import { Response, Request } from './express';
import { decode } from './token';

export const validateSchema = (
  request: Request,
  response: Response,
  schema: any
) => {
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    response.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });

    return false;
  }
  return true;
};

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const guid = () => {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};

export const checkToken = async (request: Request) => {
  const token = request.cookies['access_token'];

  if (!token) return false;

  try {
    const decoded: any = await decode(token);
    const { user, exp } = decoded;

    request.user = user;
    request.tokenExpire = new Date(exp * 1000);
  } catch (e) {
    request.user = null;
    return false;
  }
  return true;
};
