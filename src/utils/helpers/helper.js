import crypto from 'crypto';

const generateRandomNumber = (size) => {
  let code = '';
  code += crypto.randomBytes(256).readUIntBE(0, 6);
  return Number.parseInt(code.slice(0, size), 10);
};

export default generateRandomNumber;
