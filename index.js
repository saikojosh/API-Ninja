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
  let instance;

  // Can't reuse keys.
  if (apiList[key] && Object.keys(apiList[key]).length) {
    throw new Error('API-Ninja: An API has already been instantiated with this key!');
  }

  // Instantiate using function.
  if (args.length === 1 && typeof args[0] === 'function') {
    instance = args[0](Module);

  // Instantiate using parameters.
  } else {
    args.unshift(null);
    instance = new (Function.prototype.bind.apply(Module, args));
  }

  // Merge the instance into the api list.
  if (apiList[key]) { Object.assign(apiList[key], instance); } else { apiList[key] = instance; }

  // Also return the instance so we can use it immediately.
  return apiList[key];

};

/*
 * Returns the given API instance. We assume all keys passed in are correct, and if the key hasn't been instantiated yet
 * we provide an empty object.
 */
ME.use = function (key) {
  if (typeof apiList[key] === 'undefined') { apiList[key] = {}; }
  return apiList[key];
};
