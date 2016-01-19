import num from './index';
import * as chai from 'chai';

var expect = chai.expect;

describe('test-feature', () => {
    it('feature function should return number 1', () => {
        expect(num()).to.be.equal(2);
    });
});
