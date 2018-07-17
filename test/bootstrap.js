'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

global.expect = chai.expect;
global.assert = chai.assert;
global.fail = chai.assert.fail;

const mockery = require('mockery');
mockery.registerSubstitute('../../../lib/zn-firebase', './test/stub');
mockery.registerAllowables(['../index', 'q']);
