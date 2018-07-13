# Backend Firebase

> Helper module for working with znFirebase in Zengine backend Plugins.

## Installation

```bash
npm i @zenginehq/backend-firebase --save
```

## Usage

```js
var zbf = require('@zenginehq/backend-firebase');

var workspaceId = 11111

// Load data.
zbf.load(workspaceId).then(function (data) {
  console.log('it works!', data);
  // data fetched from <firebaseRoot>/11111
}).catch(function (err) {
  console.error(err);
});

// Save data.
var dataObj = {
  'childRoute': someData
  // someData could be any data type,
  // but dataObj (2nd argument of .save()) must be an object
}

zbf.save(workspaceId, dataObj).then(function () {
  console.log('success!');
  // someData was saved at <firebaseRoot>/11111/childRoute
}).catch(function (err) {
  console.error(err);
});

// Delete data.
var recordId = 222
var deleteObj = {}
deleteObj[recordId] = null

zbf.save(workspaceId, deleteObj).then(function () {
  console.log('success!');
  // the firebase route <firebaseRoot>/11111/222
  // and all data it contained has been deleted
}).catch(function (err) {
  console.error(err);
})

// Use arrays to formulate complex Firebase paths for both loading and saving.
var formId = 222
var recordId = 333

zbf.load([workspaceId, formId, recordId, 'settings']).then(function (data) {
  // This will expand to: <firebaseRoot>/11111/222/333/settings
  console.log('it works!', data);
}).catch(function (err) {
  console.error(err);
});

// You can also pass a long string if that's your thing.
zbf.load('foo/bar/baz/' + workspaceId + '/etc');
```

_Note about Deletions_

Passing `null` as the second argument of `.save` will cause strange and unhelpful behavior.
Instead, pass an object with the endpoint(s) as the key(s) and `null` as the value(s) for the second argument.
See [Firebase docs](https://www.firebase.com/docs/web/api/firebase/update.html) for the underlying `.update()` command that is called.

Ex:
```js
// much regrets
zbf.save([workspaceId, 'undesiredField'], null).then(function () {
    //etc...
  })

// all the good vibes
zbf.save([workspaceId], {'undesiredField': null})
  .then(function () {
    // great work, team!
  })
```