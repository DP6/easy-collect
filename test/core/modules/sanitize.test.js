'use strict';

const expect = require('chai').expect;
const sanitize = require('../../.././core/modules/sanitize.js');

describe('Core', () => {
  describe('Modules', () => {
    it('should export a function', () => {
      expect(sanitize).to.be.a('function');
    });
    
    describe('.sanitize(text)', () => {
      it('should replace special characters for normalize String to DP6 pattern', () => {
        expect(sanitize('O cão é do DONO')).to.equal('o_cao_e_do_dono');
      });
      
      it('should return a empty String if text is not truthey', () => {
        expect(sanitize()).to.be.empty;
      });
      
    });
    
    describe('.sanitize(text, opts)', () => {
      it('should return String with spacer equal to |', () => {
        expect(sanitize('bringing science to digital marketing DP6', { spacer: '|' })).to.equal('bringing|science|to|digital|marketing|dp6');
      });
      
      it('should return capitalized String', () => {
        expect(sanitize('bringing science to digital marketing DP6', { capitalized: true, spacer: ' ' })).to.equal('Bringing Science To Digital Marketing Dp6');
      });
    });
  });
});
