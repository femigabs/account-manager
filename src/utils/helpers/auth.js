import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

const secret = config.JWT_SECRET;
const expiry = config.JWT_EXPIRY_DURATION;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const verifyPassword = (password, hashedPassword) => {
  const validPassword = bcrypt.compareSync(password, hashedPassword);
  if (validPassword) {
    return true;
  }
  return false;
};

export const generateToken = (payload) => {
  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  return token;
};
