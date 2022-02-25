/* eslint-disable import/no-cycle */
import * as TransactionServices from '../services/transaction.services';
import { successResponse } from '../utils';

/**
 * Controller to fund account
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const fundAccount = async (req, res, next) => {
  try {
    const data = await TransactionServices.fundAccount(req.body);
    successResponse(res, 'Account funded successfully', 200, data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to withdraw fund from account
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const withdraw = async (req, res, next) => {
  try {
    const data = await TransactionServices.withdrawal(req.body);
    successResponse(res, 'Account withdrawal was successful', 200, data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to withdraw fund from account
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const transfer = async (req, res, next) => {
  try {
    const data = await TransactionServices.transfer(req.body);
    successResponse(res, 'Transfer was successful', 200, data);
  } catch (error) {
    next(error);
  }
};
