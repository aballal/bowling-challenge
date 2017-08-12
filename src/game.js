'use strict';

var Game = function(playerName, frameClass, playerClass) {
  this._frameClass = frameClass || Frame;
  this._playerClass = playerClass || Player;

  this._frames = [];
  this._createEmptyFrames();
  this._currentFrameNumber  = 0;

  this._player = new this._playerClass(playerName);

  this._isFirstRoll = true;

  this._runningTotal = 0;
};

Game.prototype._createEmptyFrames = function () {
  for (var i = 1; i <= 10; i++) this._frames.push(new this._frameClass(i));
};

Game.prototype.getFrames = function() {
  return this._frames;
};

Game.prototype.getCurrentFrameNumber = function() {
  return this._currentFrameNumber;
};

Game.prototype.getCurrentFrame = function() {
  return this._frames[this._currentFrameNumber];
};

Game.prototype.getPlayer = function() {
  return this._player;
};

Game.prototype.receiveRoll = function(pins) {
  var frame = this._frames[this._currentFrameNumber];
  this._updateFrame(frame,pins);
  this._calculateScore();
  if (!frame.isAStrike()) this._isFirstRoll = !this._isFirstRoll;
  if (this._isFirstRoll) this._currentFrameNumber += 1;
};

Game.prototype._updateFrame = function(frame, pins) {
  var frame = this._frames[this._currentFrameNumber];
  this._isFirstRoll ? frame.setFirstRoll(pins) : frame.setSecondRoll(pins);
};

Game.prototype._calculateScore = function() {
  if (this._isFirstRoll) return;
  var frame = this._frames[this._currentFrameNumber];

  if (this._currentFrameNumber == 0) {
    frame.calculateScore(0,0);
    this._runningTotal += frame.getScore();
  }
};

Game.prototype.getScore = function() {
  return this._runningTotal;
};
