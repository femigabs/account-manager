/* eslint-disable import/no-cycle */
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../utils/helpers/auth';
import { Error } from '../utils/index';
import { config, db } from '../config';
import constants from '../utils/constants/messages';

const secret = config.JWT_SECRET;

export const checkIfUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await db('accounts').where('email', email).first();
    if (user) {
      const error = Error(constants.ALREADY_EXIST('Account'), 400);
      logger.error(error.message);
      throw error;
    }
    next();
  } catch (error) {
    logger.error('authMiddleware::checkIfUserExists', error);
    next(error);
  }
};

export const validateUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await db('accounts').where('email', email).first();
    if (!user) {
      const error = Error('Invalid credentials', 400);
      logger.error(error.message);
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    logger.error('authMiddleware::validateUser', error);
    next(error);
  }
};

export const comparePassword = async (req, res, next) => {
  try {
    const { body } = req;
    const { user } = req;
    if (!verifyPassword(body.password, user.password)) {
      const error = Error(`Invalid credentials`, 400);
      logger.error(error.message);
      throw error;
    }
    const { password, ...newUser } = user;
    req.user = newUser;
    next();
  } catch (error) {
    logger.error('authMiddleware::comparePassword::', error);
    next(error);
  }
};

export const userAuth = (req, res, next) => {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
      const error = Error('Authorization token is required', 401);
      logger.error(error.message);
      throw error;
    }

    const decoded = jwt.verify(bearerToken, secret);
    req.decoded = decoded;
    req.decoded.token = bearerToken;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.code = 401;
      error.message = 'Your session has expired';
    }
    logger.error('authMiddleware::userAuth', error);
    next(error);
  }
};
