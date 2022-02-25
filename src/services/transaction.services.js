/* eslint-disable import/no-cycle */
import { db } from '../config';
import generateRandomNumber from '../utils/helpers/helper';

export const fundAccount = async (body) => {
  const {
    user_account, amount,
  } = body;
  const transaction_id = generateRandomNumber(8);
  await db.transaction(async (trx) => {
    await trx('transactions').insert({
      user_account,
      amount,
      type: 'deposit',
      status: 'successful',
      transaction_id,
    });

    const account = await trx('accounts')
      .where('account', user_account).first();

    const newBalnce = Number(account.balance) + Number(amount);

    await trx('accounts')
      .where('account', user_account)
      .update({
        balance: newBalnce,
      });
  });
};

export const withdrawal = async (body) => {
  const {
    user_account, amount,
  } = body;
  const transaction_id = generateRandomNumber(8);
  await db.transaction(async (trx) => {
    await trx('transactions').insert({
      user_account,
      amount,
      type: 'withdrawal',
      status: 'successful',
      transaction_id,
    });

    const account = await trx('accounts')
      .where('account', user_account).first();

    const newBalance = Number(account.balance) - Number(amount);

    await trx('accounts')
      .where('account', user_account)
      .update({
        balance: newBalance,
      });
  });
};

export const transfer = async (body) => {
  const {
    user_account, receiver_account, amount,
  } = body;
  const transaction_id = generateRandomNumber(8);
  await db.transaction(async (trx) => {
    await trx('transactions').insert({
      user_account,
      receiver_account,
      amount,
      type: 'transfer',
      status: 'successful',
      transaction_id,
    });

    const senderAccount = await trx('accounts')
      .where('account', user_account).first();
    const senderNewBalance = Number(senderAccount.balance) - Number(amount);
    const receiverAccount = await trx('accounts')
      .where('account', receiver_account).first();
    const receiverNewBalance = Number(receiverAccount.balance) + Number(amount);

    await trx('accounts')
      .where('account', user_account)
      .update({
        balance: senderNewBalance,
      });

    await trx('accounts')
      .where('account', receiver_account)
      .update({
        balance: receiverNewBalance,
      });
  });
};
