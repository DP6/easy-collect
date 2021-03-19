'use strict';

const expect = require('chai').expect;
const cookie = require('../../.././core/modules/cookie.js');

describe('Core', () => {
  describe('Modules', () => {
    describe('.cookie(name, value, opts)', () => {
      it('should export a function', () => {
        expect(cookie.cookie).to.be.a('function');
      });
    });
    
    describe('.getCookie(key)', () => {
      it('should export a function', () => {
        expect(cookie.setCookie).to.be.a('function');
      });
    });
  });
});