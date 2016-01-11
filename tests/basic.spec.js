/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0 */

import * as ReAnimator from '../src/index';
import chai, { expect } from 'chai';

describe('ReAnimator', () => {
  it('should be able to animate one element', (done) => {
    let passFirst = false;
    let passLast = false;
    ReAnimator.animateElement('#part', ['loop'], {
      timeout: 300,
      before() {
        passFirst = true;
      },
      after() {
        passLast = true;
      }
    });
    let node = document.getElementById('part');
    expect(node.className).to.be.equal('');
    setTimeout(() => {
      expect(node.className).to.be.equal('loop');
      expect(passFirst).to.be.true;
      expect(passLast).to.be.false;
      setTimeout(() => {
        expect(node.className).to.be.equal('');
        expect(passLast).to.be.true;
        done();
      }, 200);
    }, 150);
  });
  it('should be able to animate multiple elements', (done) => {
    let passFirst = false;
    let passLast = false;
    let counterbefore = 0;
    let counterafter = 0;
    ReAnimator.animateElements('.parts', ['loop'], {
      timeout: 300,
      beforeAll() {
        passFirst = true;
      },
      afterAll() {
        passLast = true;
      },
      beforeItem() {
        counterbefore += 1;
      },
      afterItem() {
        counterafter += 1;
      }
    });
    let node1 = document.getElementById('p1');
    let node2 = document.getElementById('p2');
    expect(node1.className).to.be.equal('parts');
    expect(node2.className).to.be.equal('parts');
    setTimeout(() => {
      expect(node1.className).to.be.equal('parts loop');
      expect(node2.className).to.be.equal('parts loop');
      expect(counterbefore).to.be.equal(2);
      expect(passFirst).to.be.true;
      expect(passLast).to.be.false;
      setTimeout(() => {
        expect(node1.className).to.be.equal('parts');
        expect(node2.className).to.be.equal('parts');
        expect(counterafter).to.be.equal(2);
        expect(passLast).to.be.true;
        done();
      }, 200);
    }, 150);
  });
  it('should be able to hide and show some node', (done) => {
    let node = document.getElementById('part');
    expect(node.style.display).to.be.equal('block');
    ReAnimator.hide('#part', 'hide', 200);
    setTimeout(() => {
      expect(node.style.display).to.be.equal('block');
      setTimeout(() => {
        expect(node.style.display).to.be.equal('none');
        ReAnimator.show('#part', 'show', 200);
        setTimeout(() => {
          expect(node.style.display).to.be.equal('block');
          done();
        }, 300);
      }, 200);
    }, 100);
  });
});
