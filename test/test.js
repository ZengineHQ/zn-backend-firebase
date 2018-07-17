'use strict';

const mockery = require('mockery');
let $firebase;

describe('module', function () {

	before(function () {
		mockery.enable();
		$firebase = require('../index');
	});

	after(function () {
		mockery.disable();
	});


	it('should load data from firebase', function () {
		return $firebase.load('foo').then(function (val) {
			expect(val).to.equal('data from firebase');
		});
	});

	it('should save data to firebase', function () {
		return $firebase.save('foo', {}).should.be.fulfilled;
	});
});
