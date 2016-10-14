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

function Transformer (graphics) {
     this.graphics = graphics;
}
// usually called A
Transformer.prototype.scale = function (currentMatrix, scaleX, scaleY) {
     return pushMatrix(this.graphics, currentMatrix, scaleMatrix(scaleX, scaleY));
}

// usually called R
Transformer.prototype.rotate = function (currentMatrix, theta) {
     return pushMatrix(this.graphics, currentMatrix, rotateMatrix(theta));
}

// usually called T
Transformer.prototype.translate = function (currentMatrix, translateX, translateY) {
     return pushMatrix(this.graphics, currentMatrix, translateMatrix(translateX, translateY));
}

// usually called F
Transformer.prototype.reflection = function (currentMatrix, axis) {
     return pushMatrix(this.graphics, currentMatrix, reflectionMatrix(axis));
}

// usually c
Transformer.prototype.shear = function (currentMatrix, lambda, axis) {
     return pushMatrix(this.graphics, currentMatrix, shearMatrix(lambda, axis));
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
