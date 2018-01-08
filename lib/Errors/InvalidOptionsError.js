'use strict';

/**
 * @class
 * @desc Happen when an Invalid Options pass to get-routes constractor.
 * @type Error
 * @memberOf Error
 */
class InvalidOptionsError extends Error {
    /**
     *
     * @param {String} optionKey The invalid option key.
     */
  constructor (optionKey) {
    super(`Invalid Option pass to the get-routes constractor. the invalid key: '${optionKey}'.`);
  }
}

module.exports = InvalidOptionsError;
