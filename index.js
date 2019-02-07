'use strict';

const Q = require('q');

let Firebase = function(znFirebase) {

	const firebase = {};

	/**
	 * Expand a generic Firebase path and return a reference to it.
	 *
	 * @param {string} path
	 *
	 * @returns {Firebase} A Firebase reference.
	 */
	firebase.expandPath = function (path) {

		let ref = znFirebase;

		if (!ref) {
			ref = require('../../../lib/zn-firebase')();
		}

		if (Array.isArray(path) && path.length) {
			return ref.child(path.join('/'));
		} else if (path) {
			return ref.child(path);
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
	firebase.load = function (path) {
		let def = Q.defer();

		firebase.expandPath(path).once('value', function(snapshot) {
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
	firebase.save = function (path, data) {
		let def = Q.defer();

		firebase.expandPath(path).update(data, function (err) {
			if (err) {
				def.reject(err);
			} else {
				def.resolve();
			}
		});

		return def.promise;
	};

	/**
	 * @callback updateFunction A developer-supplied function which will be passed
	 * 				the current data stored at this location (as a JavaScript object).
	 * 			The function should return the new value it would like written (as a JavaScript object).
	 *			If undefined is returned (i.e. you return with no arguments),
	 *			the transaction will be aborted and the data at this location will not be modified.
	 * @param {string|number|boolean|null} value initial value in Firebase
	 * @returns {string|number|boolean|void} updated value
	 */

	/**
	 * Atomically modifies and then returns the data at this location. Full firebase documentation:
	 * https://www.firebase.com/docs/web/api/firebase/transaction.html
	 *
	 * @param {Array<string>} path An array of path components that will be concatenated with '/' as the separator.
	 * 	Ex: ['foo', 'bar', 'baz'] will become 'foo/bar/baz'
	 * @param {updateFunction} updateFunction A developer-supplied function which will be passed the current data stored at this location (as a JavaScript object). The function should return the new value it would like written (as a JavaScript object). If undefined is returned (i.e. you return with no arguments) the transaction will be aborted and the data at this location will not be modified.
	 * @param {boolean} applyLocally By default, events are raised each time the transaction update function runs. So if it is run multiple times, you may see intermediate states. You can set this to false to suppress these intermediate states and instead wait until the transaction has completed before events are raised.
	 *
	 * @return {Promise<string|number|boolean>} Value from the onComplete Function
	 *
	 * @see expandPath
	 */
	firebase.transaction = function (path, updateFunction, applyLocally) {
		let def = Q.defer();
		let ref = firebase.expandPath(path);

		ref.transaction(updateFunction, function (err, committed, snapshot) {
			if (err || !committed) {
				def.reject(err || 'update function return undefined; value not saved');
			} else {
				def.resolve(snapshot.val());
			}
		}, applyLocally);

		return def.promise;
	};

	return firebase;

};

module.exports = Firebase;

