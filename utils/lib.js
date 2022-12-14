/**
 * wrapper function to catch errors in async functions
 *
 * @param {function} fn
 * @returns void
 */
const asyncHandler = function (fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
};
//////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @property isOperational : distinguish operational error from other unknown errors
 *
 * Error.captureStackTrace : creates the stack property on Error instance
 * @param this : target object
 * @param this.constructor : error class
 */
class CustomError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
    this.status = String(this.statusCode).startsWith(4) ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * used to merge objects based on commom property
 * eg getAllCategories
 */

const groupBy = function (objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
};
//////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * handles uncaught (sync) exceptions and (async) rejections
 */
const terminate = function (err, server) {
  console.log(err.name, err.message);
  if (server) server.close();
  process.exit(-1);
};
//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = { asyncHandler, CustomError, groupBy, terminate };
