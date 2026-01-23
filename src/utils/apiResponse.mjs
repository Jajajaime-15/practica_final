export const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data
  };
};

export const errorResponse = (message, errors = null) => {
  return {
    success: false,
    message,
    errors
  };
};