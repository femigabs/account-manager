/* eslint-disable max-len */
export const Error = (message, code) => ({
  status: 'error',
  message,
  code,
  data: null,
});

export const successResponse = (res, message, code, data) => {
  res.status(code).json({
    status: 'success',
    message,
    code,
    data,
  });
};

export const errorResponse = (err, req, res) => {
  logger.error(`${err.code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.code || 500).json({
    status: err.status,
    message: err.message,
    code: err.code,
    data: err.data,
  });
};
