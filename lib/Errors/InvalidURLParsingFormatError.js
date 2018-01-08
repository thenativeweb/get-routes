'use strict';

/**
 * @class
 * @desc Happen when an Invalid URL parsing format selected in get-routes option.
 * @type Error
 * @memberOf Error
 */
class InvalidURLParsingFormatError extends Error {
  constructor () {
    super('Invalid URL parsing format selected.supported format: \'human-readable\', \'regex\'.');
  }
}

module.exports = InvalidURLParsingFormatError;
