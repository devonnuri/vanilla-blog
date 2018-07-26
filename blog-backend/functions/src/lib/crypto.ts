import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = (plain: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      if (error) reject(error);
      bcrypt.hash(plain, salt, (error, hash) => {
        if (error) reject(error);
        resolve(hash);
      });
    });
  });
};

export const check = (plain: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hash, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
