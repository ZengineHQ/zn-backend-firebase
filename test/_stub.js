'use strict';

const snapshot = {
	val () {
		return 'data from firebase';
	}
};

module.exports = function () {
	const obj = {
		child: (path) => {
			obj.path = path;
			return obj;
		},
		once: (s, cb, err) => {
			return !obj.path ? err() : cb(snapshot)
		},
		update: (d, cb) => cb(!d),
		transaction: (updateFn, completeFn, applyLocally) => {
			if (updateFn instanceof Error) {
				return completeFn(updateFn)
			}

			const newVal = updateFn(1);

			if (newVal === undefined) {
				return completeFn(null, false, snapshot);
			} else {
				return completeFn(null, true, snapshot);
			}
		},
		path: ''
	};

	return obj;
};
