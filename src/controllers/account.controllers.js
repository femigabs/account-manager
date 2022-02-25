/* eslint-disable import/no-cycle */
import * as AccountServices from '../services/account.services';
import { successResponse } from '../utils';
import constants from '../utils/constants/messages';

/**
 * Controller to add account
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createAccount = async (req, res, next) => {
  try {
    const data = await AccountServices.createAccount(req.body);
    successResponse(res, constants.CREATE_SUCCESS('Account'), 201, data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to login account
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginAccount = async (req, res, next) => {
  try {
    const data = await AccountServices.loginAccount(req.user);
    successResponse(res, 'User logged in successfully', 200, data);
  } catch (error) {
    next(error);
  }
};
