export const createError = (message, code) => {
    const error = new Error;
    error.message = message;
    error.statusCode = code;
    throw error;
}