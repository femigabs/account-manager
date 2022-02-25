import express from 'express';
import * as AccountValidator from '../../validators/account.validators';
import * as AccountController from '../../controllers/account.controllers';
import * as AuthMiddleware from '../../middlewares/auth.middlewares';

const router = express.Router();

router.post(
  '/create',
  AccountValidator.createAccount,
  AuthMiddleware.checkIfUserExists,
  AccountController.createAccount,
);

router.post(
  '/login',
  AccountValidator.login,
  AuthMiddleware.validateUser,
  AuthMiddleware.comparePassword,
  AccountController.loginAccount,
);

export default router;
