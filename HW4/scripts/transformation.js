/*
 * Author: Isaiah Mann, Sara Mathieson (original version of pushMatrix method)
 * Description: Scripts relating to matrix transformations
 * Dependencies: matrix.js, vector.js
 */

var Y_AXIS = "y";
var X_AXIS = "x";

// usually called A
function scaleMatrix(scaleX, scaleY) {
     return new Matrix([[scaleX, 0, 0], [0, scaleY, 0], [0, 0, 1]]);
}

// usually called R
function rotateMatrix(theta) {
     return new Matrix([[Math.cos(theta), -Math.sin(theta), 0], [Math.sin(theta), Math.cos(theta), 0], [0, 0, 1]]);
}

// usually called T
function translateMatrix(translateX, translateY) {
     return new Matrix([[1, 0, translateX], [0, 1, translateY], [0, 0, 1]]);
}

// usually called F
function reflectionMatrix (axis) {
     if (axis === X_AXIS) {
          return new Matrix([[1, 0, 0], [0, -1, 0], [0, 0, 1]]);
     } else if (axis === Y_AXIS) {
          return new Matrix([[-1, 0, 0], [0, 1, 0], [0, 0, 1]]);
     } else {
          console.log("Incopatible axis name. Returning null");
          return null;
     }
}

// usually c
function shearMatrix (lambda, axis) {
     if (axis === X_AXIS) {
          return new Matrix([[1, lambda, 0], [0, 1, 0], [0, 0, 1]]);
     } else if (axis === Y_AXIS) {
          return new Matrix([[1, 0, 0], [lambda, 1, 0], [0, 0, 1]]);
     } else {
          console.log("Incopatible axis name. Returning null");
          return null;
     }
}

function Transform (graphics) {
     this.reset();
     this.graphics = graphics;
}

Transform.prototype = {
     get matrix () {
          return this.currentMatrix;
     },
     get x () {
          return this.currentMatrix[0][2];
     },
     get y () {
          return this.currentMatrix[1][2];
     },
}

Transform.prototype.matrix = function () {
     return this.currentMatrix;
}

// usually called A
Transform.prototype.scale = function (scaleX, scaleY) {
     this.currentMatrix = pushMatrix(this.graphics, this.currentMatrix, scaleMatrix(scaleX, scaleY));
}

// usually called R
Transform.prototype.rotate = function (theta) {
     this.currentMatrix = pushMatrix(this.graphics, this.currentMatrix, rotateMatrix(theta));
}

// usually called T
Transform.prototype.translate = function (translateX, translateY) {
     this.currentMatrix = pushMatrix(this.graphics, this.currentMatrix, translateMatrix(translateX, translateY));
}

// usually called F
Transform.prototype.reflect = function (axis) {
     this.currentMatrix = pushMatrix(this.graphics, this.currentMatrix, reflectionMatrix(axis));
}

// usually c
Transform.prototype.shear = function (lambda, axis) {
     this.currentMatrix = pushMatrix(this.graphics, this.currentMatrix, shearMatrix(lambda, axis));
}

Transform.prototype.reset = function () {
     this.currentMatrix = identityMatrix();
}

Transform.prototype.toString = function () {
     return this.currentMatrix.toString();
}

// this function multiplies the current matrix by another transformation,
// then updates the current matrix to the result
function pushMatrix(graphics, currentMatrix, newMatrix) {
   currentMatrix = matrixMultiply(currentMatrix, newMatrix); // order very important!
   // note that the setTransform method clear the current matrix and then
   // sets it to be this new one (it does not build up the transformations!)
   graphics.setTransform(currentMatrix[0][0],currentMatrix[1][0],
                      currentMatrix[0][1],currentMatrix[1][1],
                      currentMatrix[0][2],currentMatrix[1][2]);
   return currentMatrix;
}
