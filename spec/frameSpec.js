'use strict';

describe('Frame', function() {
  var frame;

  beforeEach(function() {
    frame = new Frame(1);
  });

  describe('constructor', function() {
    it('has an ID', function() {
      expect(frame.getID()).toEqual(1);
    });

    it('has zero pins recorded for first roll', function() {
      expect(frame.getFirstRoll()).toEqual(0);
    });

    it('has zero pins recorded for second roll', function() {
      expect(frame.getSecondRoll()).toEqual(0);
    });

    it('is not a strike', function() {
      expect(frame.isAStrike()).toBe(false);
    });

    it('is not a spare', function() {
      expect(frame.isASpare()).toBe(false);
    });
  });

  describe('setFirstRoll', function() {
    it('can set first roll', function() {
      frame.setFirstRoll(6);
      expect(frame.getFirstRoll()).toEqual(6);
    });

    it('cannot set first roll to more than 10 pins', function() {
      expect(function() { frame.setFirstRoll(11); }).toThrowError('Pins cannot exceed a maximum of 10');
    });

    it('is a strike if 10 pins are knocked down', function() {
      frame.setFirstRoll(10);
      expect(frame.isAStrike()).toBe(true);
    });

    it('is not a strike if less than 10 pins are knocked down', function() {
      frame.setFirstRoll(6);
      expect(frame.isAStrike()).toBe(false);
    });
  });

  describe('setSecondRoll', function() {
    it('can set second roll', function() {
      frame.setFirstRoll(6);
      frame.setSecondRoll(3);
      expect(frame.getSecondRoll()).toEqual(3);
    });

    it('cannot set second roll if the total is more than 10 pins', function() {
      frame.setFirstRoll(6);
      expect(function() { frame.setSecondRoll(5); }).toThrowError('Pins cannot exceed a maximum of 10');
    });

    it('is a spare if 10 pins are knocked down', function() {
      frame.setFirstRoll(6);
      frame.setSecondRoll(4);
      expect(frame.isASpare()).toBe(true);
    });

    it('is not a spare if less than 10 pins are knocked down', function() {
      frame.setFirstRoll(6);
      frame.setSecondRoll(3);
      expect(frame.isASpare()).toBe(false);
    });
  });
});
