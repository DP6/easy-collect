'use strict';

const expect = require('chai').expect;
const closet = require('../../.././core/modules/closet.js');

describe('Core', () => {
  describe('Modules', () => {
    describe('.closest(elm, seletor)', () => {
      it('should export a function', () => {
        expect(closet).to.be.a('function');
      });
    });
  });
});