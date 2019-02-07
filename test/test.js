'use strict';

let $firebase;

describe('module', function () {

	beforeEach(function () {
		const stub = require('./_stub')();

		$firebase = require('../index')(stub);
	});

	it('should expand firebase paths', function () {
		expect($firebase.expandPath('foo').path).to.equal('foo');
		expect($firebase.expandPath('foo/bar/baz').path).to.equal('foo/bar/baz');
		expect($firebase.expandPath(['foo']).path).to.equal('foo');
		expect($firebase.expandPath(['foo', 'bar', 'baz']).path).to.equal('foo/bar/baz');
	});

	it('should load data from firebase', function () {
		return $firebase.load('foo').then(function (val) {
			expect(val).to.equal('data from firebase');
		});
	});

	it('should catch errors when loading data', function () {
		return $firebase.load(false).should.be.rejected;
	});

	it('should save data to firebase', function () {
		return $firebase.save('foo', true).should.be.fulfilled;
	});

	it('should catch errors when saving data', function () {
		return $firebase.save('foo', false).should.be.rejected;
	});

	it('should complete firebase transactions', function () {
		return $firebase.transaction('foo', value => value + 1, true).should.be.fulfilled;
	});

	it('should reject if firebase transaction is not effective', function () {
		return $firebase.transaction('foo', value => { }, false).should.be.rejected;
	});

	it('should catch errors during firebase transactions', function () {
		return $firebase.transaction('foo', new Error('will fail'), false).should.be.rejected;
	});
});
