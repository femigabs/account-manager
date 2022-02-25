/* eslint-disable import/no-cycle */
import { Router } from 'express';
import AccountRoute from './account.routes';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome To Account Manager v1' });
});

router.use('/account', AccountRoute);

export default router;
