'use strict';

const apis = require('../index');

const tel = apis.init('tel', require('twilio'), 'accountSID', 'authToken');

console.log('tel', tel);
