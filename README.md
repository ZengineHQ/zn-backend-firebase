# zn-backend-firebase

Helper library for working with Firebase in Zengine backend Plugins.

## Installation

```bash
npm install git+ssh://git@github.com/WizeHive/zn-backend-firebase --save
```

## Usage

```js
var zfb = require('zn-helper-firebase');

// Load data.
zfb.load(workspaceId).then(function (data) {
  console.log('it works!', data);
}).catch(function (err) {
  console.error(err);
});

// Save data.
zfb.save(workspaceId, dataObj).then(function () {
  console.log('success!');
}).catch(function (err) {
  console.error(err);
});

// Use arrays to formulate complex Firebase paths for both loading and saving.
zfb.load([workspaceId, formId, recordId]).then(function (data) {
  // This will expand to: <firebaseRoot>/workspaceId/formId/recordId
  console.log('it works!', data);
}).catch(function (err) {
  console.error(err);
});

// You can also pass a long string if that's your thing.
zfb.load('foo/bar/baz/' + workspaceId + '/etc');
```
