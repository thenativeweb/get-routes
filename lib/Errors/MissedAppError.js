'use strict';

/**
 * @class
 * @desc This Error Happen if get-routes constractor call without any app.
 * @type Error
 * @memberOf Error
 */
class MissedAppError extends Error {
  constructor () {
    super('App is missing.');
  }
}

module.exports = MissedAppError;
