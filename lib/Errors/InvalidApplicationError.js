'use strict';

/**
 * @class
 * @desc Happen when an unsupported Application pass to get-routes constractor.
 * @type Error
 * @memberOf Error
 */
class InvalidApplicationError extends Error {
  constructor () {
    super('Invalid application type.');
  }
}

module.exports = InvalidApplicationError;
