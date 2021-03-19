'use strict';

const expect = require('chai').expect;
const has = require('../../.././core/modules/has.js');

describe('Core', () => {
  describe('Modules', () => {
    describe('.has(obj, key)', () => {
      it('should export a function', () => {
        expect(has).to.be.a('function');
      });
      
      it('should return true if object has attribute with name of the key', () => {
        expect(has({ name: 'foo' }, 'name')).true;
      });
    });
  });
});