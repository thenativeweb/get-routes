'use strict';

/**
 * @class
 * @desc Happen when an unsupported HTTP method find in route app configuration.
 * @type Error
 * @memberOf Error
 */
class InvalidHTTPMethodError extends Error {
    /**
     * @param {String} method The fended invalid method.
     */
  constructor (method) {
    super(`Invalid method ${method}.`);
  }
}

module.exports = InvalidHTTPMethodError;
