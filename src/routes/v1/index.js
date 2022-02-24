/* eslint-disable import/no-cycle */
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome To Account Manager v1' });
});

export default router;
