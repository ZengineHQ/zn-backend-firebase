# Backend Firebase

> Helper module for working with znFirebase in Zengine backend Plugins.

[![Coverage Status](https://coveralls.io/repos/github/ZengineHQ/zn-backend-firebase/badge.svg?branch=master)](https://coveralls.io/github/ZengineHQ/zn-backend-firebase?branch=master)   [![Build Status](https://circleci.com/gh/ZengineHQ/zn-backend-firebase/tree/master.svg?style=shield)](https://circleci.com/gh/ZengineHQ/zn-backend-firebase/tree/master) [![npm version](https://badge.fury.io/js/%40zenginehq%2Fbackend-firebase.svg)](https://badge.fury.io/js/%40zenginehq%2Fbackend-firebase)

## Installation

```bash
npm i @zenginehq/backend-firebase --save
```

## Usage

```js
var $firebase = require('@zenginehq/backend-firebase');

var workspaceId = 11111;

// Load data.
$firebase.load(workspaceId).then(function (data) {
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

$firebase.save(workspaceId, dataObj).then(function () {
  console.log('success!');
  // someData was saved at <firebaseRoot>/11111/childRoute
}).catch(function (err) {
  console.error(err);
});

// Delete data.
var recordId = 222
var deleteObj = {}
deleteObj[recordId] = null

$firebase.save(workspaceId, deleteObj).then(function () {
  console.log('success!');
  // the firebase route <firebaseRoot>/11111/222
  // and all data it contained has been deleted
}).catch(function (err) {
  console.error(err);
})

// Use arrays to formulate complex Firebase paths for both loading and saving.
var formId = 222
var recordId = 333

$firebase.load([workspaceId, formId, recordId, 'settings']).then(function (data) {
  // This will expand to: <firebaseRoot>/11111/222/333/settings
  console.log('it works!', data);
}).catch(function (err) {
  console.error(err);
});

// You can also pass a long string if that's your thing.
$firebase.load('foo/bar/baz/' + workspaceId + '/etc');
```

_Note about Deletions_

Passing `null` as the second argument of `.save` will cause strange and unhelpful behavior.
Instead, pass an object with the endpoint(s) as the key(s) and `null` as the value(s) for the second argument.
See [Firebase docs](https://www.firebase.com/docs/web/api/firebase/update.html) for the underlying `.update()` command that is called.

Ex:
```js
// much regrets
$firebase.save([workspaceId, 'undesiredField'], null).then(function () {
  //etc...
})

// all the good vibes
$firebase.save(workspaceId, {'undesiredField': null}).then(function () {
  // great work, team!
});
```

## API Docs

[Full documentation](https://zenginehq.github.io/zn-backend-firebase)

test
