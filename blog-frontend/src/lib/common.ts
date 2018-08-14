import client from './Client';

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
