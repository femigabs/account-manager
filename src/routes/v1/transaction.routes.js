/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import express from 'express';
import * as TransactionValidator from '../../validators/transaction.validators';
import * as TransactionController from '../../controllers/transaction.controllers';
import * as AuthMiddleware from '../../middlewares/auth.middlewares';
import * as TransactionMiddleware from '../../middlewares/transaction.middlewares';

const router = express.Router();

router.post(
  '/deposit',
  TransactionValidator.transaction,
  AuthMiddleware.userAuth,
  TransactionMiddleware.checkIfAccountExists,
  TransactionController.fundAccount,
);

router.post(
  '/withdraw',
  TransactionValidator.transaction,
  AuthMiddleware.userAuth,
  TransactionMiddleware.checkIfAccountExists,
  TransactionMiddleware.validateBalance,
  TransactionController.withdraw,
);

router.post(
  '/transfer',
  TransactionValidator.transfer,
  AuthMiddleware.userAuth,
  TransactionMiddleware.checkIfAccountExists,
  TransactionMiddleware.validateReceiverAccount,
  TransactionMiddleware.validateBalance,
  TransactionController.transfer,
);

export default router;
