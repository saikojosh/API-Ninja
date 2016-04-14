# API-Ninja
Handles the instantiation of multiple different APIs so they can be used across multiple Node modules.

## Basic Usage
For APIs that just take a config object i.e. `new API({ ... })` you can use the following pattern. The first two parameters are required (key and module name), all subsequent parameters are passed through to the API's constructor.

```javascript
  const apis = require('api-ninja');

  // Initialise and use the API immediately.
  const tel  = apis.init('tel', 'twilio', config.twilio.accountSID, config.twilio.authToken);

  // Also use the API in another module.
  const tel = apis.use('tel');
```

## Advanced Usage
For APIs that require a more complicated setup you can pass in a function instead of a config object:

```javascript
  const apis = require('api-ninja');

  // Initialise with function.
  const myAPI  = apis.init('my-api', 'my-api-module', (module) => {
    return new module.InitThis('abc', 123);
  });
```
