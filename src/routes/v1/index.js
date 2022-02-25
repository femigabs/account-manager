/* eslint-disable import/no-cycle */
import { Router } from 'express';
import AccountRoute from './account.routes';
import TransactionRoute from './transaction.routes';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome To Account Manager v1' });
});

router.use('/account', AccountRoute);
router.use('/transaction', TransactionRoute);

export default router;
