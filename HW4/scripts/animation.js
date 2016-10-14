function Animator (graphics, canvas) {
     this.graphics = graphics;
     this.canvas = canvas;
}

Animator.prototype.drawBackground = function() {
     this.graphics.save(); // save the current set of transformations
     this.graphics.setTransform(1, 0, 0, 1, 0, 0); // reset matrix to the identity
     this.graphics.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
     this.graphics.restore(); // restore the transformations you had before
}
