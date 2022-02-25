import Joi from '@hapi/joi';
import baseValidator from '.';

export const transaction = async (req, res, next) => {
  const schema = Joi.object({
    user_account: Joi.number().required(),
    amount: Joi.number().positive().required(),
  });
  await baseValidator(schema, req, res, next, 'body');
};

export const transfer = async (req, res, next) => {
  const schema = Joi.object({
    user_account: Joi.number().required(),
    receiver_account: Joi.number().required(),
    amount: Joi.number().positive().required(),
  });
  await baseValidator(schema, req, res, next, 'body');
};
