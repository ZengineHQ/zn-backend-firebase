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
		once: (s, cb) => cb(snapshot),
		update: (d, cb) => cb(),
		path: ''
	};

	return obj;
};
