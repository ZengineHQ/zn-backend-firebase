'use strict';

var znFirebase = require('../lib/zn-firebase');
var Q = require('q');

/**
 * Helper to expand a generic Firebase path and return a reference.
 *
 * @param {string} path
 *
 * @returns {Firebase}
 */
function expandFirebasePath (path) {
	var ref = znFirebase();

	if (Array.isArray(path) && path.length) {
		ref = ref.child(path.join('/'));
	} else if (path) {
		ref = ref.child(path);
	}

	return ref;
}

/**
 * Helper to load data from Firebase.
 *
 * @param {Array<string>} path An array of path components that will be concatenated with '/' as the separator.
 * 	Ex: ['foo', 'bar', 'baz'] will become 'foo/bar/baz'
 *
 * @return {Promise}
 *
 * @see expandFirebasePath
 */
module.exports.load = function (path) {
	var def = Q.defer();
	var ref = expandFirebasePath(path);

	ref.once('value', function(snapshot) {
		def.resolve(snapshot.val());
	}, function (err) {
		def.reject(err);
	});

	return def.promise;
}

/**
 * Helper to save arbitrary data to Firebase.
 *
 * @param {Array<string>} path An array of path components that will be concatenated with '/' as the separator.
 * 	Ex: ['foo', 'bar', 'baz'] will become 'foo/bar/baz'
 * @param {Object} data
 *
 * @return {Promise}
 *
 * @see expandFirebasePath
 */
module.exports.save = function (path, data) {
	var def = Q.defer();
	var ref = expandFirebasePath(path);

	ref.update(data, function (err) {
		if (err) {
			def.reject(err);
		} else {
			def.resolve();
		}
	});

	return def.promise;
}
