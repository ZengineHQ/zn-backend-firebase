'use strict';

var znFirebase = require('../../../lib/zn-firebase');
var Q = require('q');

/**
 * Expand a generic Firebase path and return a reference to it.
 *
 * @param {string} path
 *
 * @returns {Firebase} A Firebase reference.
 */
module.exports.expandPath = function (path) {
	var ref = znFirebase();

	if (Array.isArray(path) && path.length) {
		ref = ref.child(path.join('/'));
	} else if (path) {
		ref = ref.child(path);
	}

	return ref;
};

/**
 * Helper to load data from Firebase.
 *
 * @param {Array<string>|string} path A string or an array of path components that will be concatenated with '/' as the separator.
 * 	Ex: ['foo', 'bar', 'baz'] will become 'foo/bar/baz'
 *
 * @return {Promise<Object>}
 *
 * @see expandPath
 */
module.exports.load = function (path) {
	var def = Q.defer();

	expandPath(path).once('value', function(snapshot) {
		def.resolve(snapshot.val());
	}, function (err) {
		def.reject(err);
	});

	return def.promise;
};

/**
 * Helper to save arbitrary data to Firebase.
 *
 * @param {Array<string>} path An array of path components that will be concatenated with '/' as the separator.
 * 	Ex: ['foo', 'bar', 'baz'] will become 'foo/bar/baz'
 * @param {Object} data
 *
 * @return {Promise}
 *
 * @see expandPath
 */
module.exports.save = function (path, data) {
	var def = Q.defer();

	expandPath(path).update(data, function (err) {
		if (err) {
			def.reject(err);
		} else {
			def.resolve();
		}
	});

	return def.promise;
};
