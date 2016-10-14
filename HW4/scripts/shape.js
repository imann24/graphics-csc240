function Shape (graphics, x, y, color) {
     this.initialize(graphics, x, y, color);
}

Shape.prototype.initialize = function (graphics, x, y, color) {
     this.graphics = graphics;
     this.transform = new Transform(this.graphics);
     this.x = x;
     this.y = y;
     this.color = color;
}

// usually called A
Shape.prototype.scale = function (scaleX, scaleY) {
     this.transform.scale(scaleX, scaleY);
}

// usually called R
Shape.prototype.rotate = function (theta) {
     this.transform.rotate(theta);
}

// usually called T
Shape.prototype.translate = function (translateX, translateY) {
     this.transform.translate(translateX, translateY);
}

// usually called F
Shape.prototype.reflect = function (axis) {
     this.transform.reflect(axis);
}

Shape.prototype.resetTransform = function () {
     this.transform.reset();
}

Shape.prototype.draw = function (drawCallback) {
     this.transform.push();
     this.graphics.fillStyle = this.color.toString();
     drawCallback();
     this.transform.pop();
}

function Rectangle (graphics, x, y, color, width, height) {
     this.initialize(graphics, x, y, color);
     this.width = width;
     this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);

Rectangle.prototype.getWidth = function () {
     return this.width * this.transform.xScale;
}

Rectangle.prototype.getHeight = function () {
     return this.height * this.transform.yScale;
}

Rectangle.prototype.draw = function () {
     var _this = this;
     Shape.prototype.draw.call(this, function(){
          _this.graphics.fillRect(_this.x, _this.y, _this.width, _this.height);});
}
