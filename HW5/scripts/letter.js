/*
 * Author: Isaiah Mann
 * Description: Classes to draw letters
 */

// Intended as an abstract superclass for letters
function Letter (pen, position, height, width) {
	this.setup(pen, position, height, width);
}

Letter.prototype.setup = function (pen, position, height, width) {
	this.pen = pen;
	this.position = position;
	this.height = height;
	this.width = width;
}

Letter.prototype.draw = function () {
	this.shape();
}

Letter.prototype.shape = function () {
	console.log("Override this method in subclasses");
}

Letter.prototype.verticalLine = function (offset, scale) {
	this.line(offset, scale, 0, this.height);
}

Letter.prototype.horizontalLine = function (offset, scale) {
	this.line(offset, scale, this.width, 0);
}

Letter.prototype.checkOffset = function (offset) {
	if (!offset) {
		return new Point(0, 0);
	} else {
		return offset;
	}
}

Letter.prototype.checkScale = function (scale) {
	if (!scale) {
		return 1;
	} else {
		return scale;
	}
}

Letter.prototype.arcTopRight = function (offset, xScale, yScale) {
	offset = this.checkOffset(offset);
	xScale = this.checkScale(xScale);
	yScale = this.checkScale(yScale);
	var startingPoint = this.position.add(offset);
	this.pen.bezierQuad(startingPoint,
		startingPoint.translate(this.width / 2 * xScale, this.height / 16 * yScale),
		startingPoint.translate(this.width / 2 * xScale, this.height / 2 * yScale));
}

Letter.prototype.arcTopLeft = function (offset, xScale, yScale) {
	offset = this.checkOffset(offset);
	xScale = this.checkScale(xScale);
	yScale = this.checkScale(yScale);
	var startingPoint = this.position.add(offset);
	this.pen.bezierQuad(startingPoint,
		startingPoint.translate(-this.width / 2 * xScale, this.height / 16 * yScale),
		 startingPoint.translate(-this.width / 2 * xScale, this.height / 2 * yScale));
}

Letter.prototype.arcBottomRight = function (offset, xScale, yScale) {
	offset = this.checkOffset(offset);
	xScale = this.checkScale(xScale);
	yScale = this.checkScale(yScale);
	var startingPoint = this.position.add(offset);
	this.pen.bezierQuad(startingPoint.translate(this.width / 2 * xScale, this.height - this.height / 2 * yScale),
		startingPoint.translate(this.width / 2 * xScale, this.height - this.height / 16 * yScale),
		 startingPoint.translate(0, this.height));
}

Letter.prototype.arcBottomLeft = function (offset, xScale, yScale) {
	offset = this.checkOffset(offset);
	xScale = this.checkScale(xScale);
	yScale = this.checkScale(yScale);
	var startingPoint = this.position.add(offset);
	this.pen.bezierQuad(startingPoint.translate((this.width / -2) * xScale, this.height - this.height / 2 * yScale),
		startingPoint.translate(this.width / -2 * xScale, this.height - this.height / 16 * yScale),
		 startingPoint.translate(0, this.height));
}

Letter.prototype.line = function (offset, scale, width, height) {
	offset = this.checkOffset(offset);
	scale = this.checkScale(scale);
	var startingPoint = this.position.add(offset);
	this.pen.bezierLine(startingPoint, startingPoint.translate(width * scale, height * scale));
}

// Uses reflection to create the correct letter, will return null for a non-implemented letter
Letter.create = function (character, pen, position, height, width) {
	character = character.toUpperCase(character);
	try {
		var letter = eval("new " + character + "Letter(pen, position, height, width)");
	} catch (error) {
		console.log(error);
		return null;
	}
	return letter;
}

function ALetter (pen, position, height, width) {
	this.setup(pen, position, height, width);
}

ALetter.prototype = new Letter();

ALetter.prototype.shape = function () {
	this.line(new Point(this.width / 4, 0), 1, this.width / 2, this.height);
	this.line(new Point(this.width / 4, 0), 1, -this.width / 2, this.height);
	this.horizontalLine(new Point(0, this.height / 2), 0.5);
}

function ILetter (pen, position, height, width) {
	this.setup(pen, position, height, width);
}

function HLetter (pen, position, height, width) {
	this.setup(pen, position, height, width);
}

HLetter.prototype = new Letter();

HLetter.prototype.shape = function () {
	this.verticalLine(new Point(-this.width / 3, 0));
	this.horizontalLine(new Point(-this.width / 3, this.height / 2), 1 / 3 + 1 / 2);
	this.verticalLine(new Point(this.width / 2, 0));
}

ILetter.prototype = new Letter();

ILetter.prototype.shape = function () {
	this.horizontalLine(new Point(-this.width / 4, 0));
	this.verticalLine(new Point(this.width / 4, 0));
	this.horizontalLine(new Point(-this.width / 4, this.height));
}

function SLetter (pen, position, height, width) {
	this.setup(pen, position, height, width);
}

SLetter.prototype = new Letter();

SLetter.prototype.shape = function () {
	this.arcTopLeft(new Point(this.width / 2, 0), 1, 0.5);
	this.arcBottomLeft(new Point(this.width / 4, -this.height / 2), 0.5, 0.5);
	this.arcTopRight(new Point(this.width / 4, this.height / 2), 0.5, 0.5);
	this.arcBottomRight(null, 1, 0.5);
}
