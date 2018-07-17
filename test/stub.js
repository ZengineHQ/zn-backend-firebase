'use strict';

const snapshot = {
	val () {
		return 'data from firebase';
	}
};

module.exports = function () {
	const obj = {
		child: () => obj,
		once: (s, cb) => cb(snapshot),
		update: (d, cb) => cb(),
	};

	return obj;
};
