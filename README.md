# Backend Firebase

> Helper module for working with znFirebase in Zengine backend Plugins.

## Installation

```bash
npm i @zenginehq/backend-firebase --save
```

## Usage

```js
var zbf = require('@zenginehq/backend-firebase');

// Load data.
zbf.load(workspaceId).then(function (data) {
  console.log('it works!', data);
}).catch(function (err) {
  console.error(err);
});

// Save data.
zbf.save(workspaceId, dataObj).then(function () {
  console.log('success!');
}).catch(function (err) {
  console.error(err);
});

// Use arrays to formulate complex Firebase paths for both loading and saving.
zbf.load([workspaceId, formId, recordId]).then(function (data) {
  // This will expand to: <firebaseRoot>/workspaceId/formId/recordId
  console.log('it works!', data);
}).catch(function (err) {
  console.error(err);
});

// You can also pass a long string if that's your thing.
zbf.load('foo/bar/baz/' + workspaceId + '/etc');
```
