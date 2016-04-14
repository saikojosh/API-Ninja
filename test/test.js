'use strict';

const apis = require('../index');

const twilio = apis.init('tel', 'twilio', 'accountSID', 'authToken');

console.log('twilio', twilio);
