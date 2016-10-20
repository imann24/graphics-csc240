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

Letter.prototype.arc = function (offset, scale) {
	offset = this.checkOffset(offset);
	scale = this.checkScale(scale);
	var startingPoint = this.position.add(offset);
	this.pen.bezierQuad(startingPoint, startingPoint.translate(this.width / 2, this.height / 16), startingPoint.translate(this.width / 2, this.height / 2));
}

Letter.prototype.line = function (offset, scale, width, height) {
	offset = this.checkOffset(offset);
	scale = this.checkScale(scale);
	var startingPoint = this.position.add(offset);
	this.pen.bezierLine(startingPoint, startingPoint.translate(width * scale, height * scale));
}

function ILetter (pen, position, height, width) {
	this.setup(pen, position, height, width);
}

ILetter.prototype = new Letter();

ILetter.prototype.shape = function () {
	this.horizontalLine();
	this.verticalLine(new Point(this.width / 2, 0));
	this.horizontalLine(new Point(0, this.height));
}

function SLetter (pen, position, height, width) {
	this.setup(pen, position, height, width);
}

SLetter.prototype = new Letter();

SLetter.prototype.shape = function () {
	this.arc();
}