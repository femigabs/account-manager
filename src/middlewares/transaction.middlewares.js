/* eslint-disable import/no-cycle */
import { db } from '../config';
import { Error } from '../utils/index';

export const checkIfAccountExists = async (req, res, next) => {
  try {
    const { user_account } = req.body;
    const { account } = req.decoded;
    const wallet = await db('accounts').where('account', user_account).first();
    if (!wallet) {
      const error = Error('Invalid user account number', 400);
      logger.error(error.message);
      throw error;
    }
    if (account !== user_account) {
      const error = Error('Account not associated to user', 400);
      logger.error(error.message);
      throw error;
    }
    next();
  } catch (error) {
    logger.error('TransactionMiddleware::checkIfAccountExists', error);
    next(error);
  }
};

export const validateBalance = async (req, res, next) => {
  try {
    const { user_account, amount } = req.body;
    const wallet = await db('accounts').where('account', user_account).first();
    if (amount > wallet.balance) {
      const error = Error('Insufficient balance', 400);
      logger.error(error.message);
      throw error;
    }
    next();
  } catch (error) {
    logger.error('TransactionMiddleware::validateBalance', error);
    next(error);
  }
};

export const validateReceiverAccount = async (req, res, next) => {
  try {
    const { receiver_account } = req.body;
    const wallet = await db('accounts')
      .where('account', receiver_account).first();
    if (!wallet) {
      const error = Error('Invalid receiver account number', 400);
      logger.error(error.message);
      throw error;
    }
    next();
  } catch (error) {
    logger.error('TransactionMiddleware::validateReceiverAccount', error);
    next(error);
  }
};
