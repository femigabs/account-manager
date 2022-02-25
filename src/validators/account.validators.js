import Joi from '@hapi/joi';
import baseValidator from '.';

export const createAccount = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().trim().lowercase({ convert: true }).email()
      .required(),
    first_name: Joi.string().trim().lowercase({ convert: true }).required(),
    last_name: Joi.string().trim().lowercase({ convert: true }).required(),
    password: Joi.string().trim().max(20).required(),
  });
  await baseValidator(schema, req, res, next, 'body');
};

export const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().trim().lowercase({ convert: true }).email()
      .required(),
    password: Joi.string().trim().max(20).required(),
  });
  await baseValidator(schema, req, res, next, 'body');
};
