/* eslint-disable import/no-cycle */
import { db } from '../config';
import { generateToken, hashPassword } from '../utils/helpers/auth';
import generateRandomNumber from '../utils/helpers/helper';

export const createAccount = async (body) => {
  const {
    first_name, last_name, email,
  } = body;
  const hashedPassword = hashPassword(body.password);
  const account = `102${generateRandomNumber(7)}`;
  const [user] = await db('accounts').insert({
    first_name, last_name, email, account, password: hashedPassword,
  });
  const { password, ...newUser } = user;
  return newUser;
};

export const loginAccount = async (user) => {
  const {
    id, first_name, last_name, email,
  } = user;
  const token = generateToken({
    id, first_name, last_name, email,
  });
  return {
    ...user,
    token,
  };
};
