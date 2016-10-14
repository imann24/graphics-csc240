/*
 * Author: Isaiah Mann
 * Description: Scripts relating to matrix math
 * Dependencies: vector.js
 */

// Access a value via: this[column][row]
function Matrix (columns) {
     this.data = [];
     for (var column = 0; column < columns.length; column++) {
          this.data.push(columns[column]);
     }
     this.columns = this.data.length;
     this.rows = this.data[0].length;
     this.setIndexFunctions();
}

Matrix.prototype.setIndexFunctions = function () {
     for (var column = 0; column < this.columns; column++) {
          this[column] = [];
          for (var row = 0; row < this.rows; row++) {
               this[column][row] = this.data[column][row];
          }
     }
}

Matrix.prototype.row = function (rowIndex) {
     var row = [];
     for (var column = 0; column < this.columns; column++) {
          row.push(this[column][rowIndex]);
     }
     return row;
}

Matrix.prototype.column = function (columnIndex) {
     return this[columnIndex];
}

Matrix.prototype.toString = function () {
     var matrixAsString = "";
     for (var y = 0; y < this.rows; y++) {
          matrixAsString += "[";
          for (var x = 0; x < this.columns; x++) {
               matrixAsString += this[x][y];
               if (x < this.columns - 1) {
                    matrixAsString += " ";
               }
          }
          matrixAsString += "]";
          if (y < this.rows - 1) {
               matrixAsString += "\n";
          }
     }
     return matrixAsString;
}

function identityMatrix () {
     return new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
}

function matrixMultiply(matrix1, matrix2) {
     if (matrix1.columns == matrix2.rows) {
          productMatrix = [];
          for (var rowInMatrix1 = 0; rowInMatrix1 < matrix1.rows; rowInMatrix1++) {
               productMatrix.push([]);
               for (var columnInMatrix2 = 0; columnInMatrix2 < matrix2.columns; columnInMatrix2++) {
                    productMatrix[rowInMatrix1].push(dotProduct(matrix1.column(rowInMatrix1), matrix2.row(columnInMatrix2)));
               }
          }
          return new Matrix(productMatrix);
     } else {
          console.log("Incompatible matrix dimensions. Returning null");
          return null;
     }
}
