import client from './Client';

export const isHttpStatus = (status: number, firstDigit: string = '4'): boolean => {
  return status.toString()[0] === firstDigit;
};

export const checkLogin = async () => {
  return await client
    .post('/auth/checklogin')
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
