'use strict';

/*
 * API-NINJA
 */

const ME = module.exports;
const apiList = {};

/*
 * Initialise a new API.
 * init('intercom', require('intercom-client'), config.intercom);
 * init('tel', require('twilio'), config.twilio.accountSID, config.twilio.authToken);
 * init('intercom', require('intercom-client'), (module) => { return new module.InitThis('abc', 123); });
 */
ME.init = function (key, Module) {

  const args = Array.prototype.slice.call(arguments, 2);  // Don't include the first two parameters.

  // Can't reuse keys.
  if (apiList[key]) { throw new Error('API-Ninja: An API has already been instantiated with this key!'); }

  if (args.length === 1 && typeof args[0] === 'function') {
    apiList[key] = args[0](Module);
  } else {
    args.unshift(null);
    apiList[key] = new (Function.prototype.bind.apply(Module, args));
  }

  // Also return the instance so we can use it immediately.
  return apiList[key];

};

/*
 * Returns the given API instance.
 */
ME.use = function (key) {
  return apiList[key];
};
