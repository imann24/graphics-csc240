/*
 * Author: Isaiah Mann
 * Description: A script to control a player
 * Dependencies: THREE.js, KeyboardState.js
 */

function Player (camera, canvas, speed, strafeSpeed, lookSpeed) {
     this.camera = camera;
     this.canvas = canvas;
     this.speed = speed;
     // For sideways movement:
     this.strafeSpeed = strafeSpeed;
     this.lookSpeed = lookSpeed;
     this.xSpeed = 0;
     this.zSpeed = 0;
     this.zRotation = 0;
     this.yRotation = 0;
     this.setup();
}
Player.prototype = {
     // Getter var to make accessing the look rotation more concise:
     get facing () {
          return this.camera.rotation.y;
     },
}

Player.prototype.setup = function () {
     this.setupMouseLook();
}

Player.prototype.getMousePos = function (canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
}

Player.prototype.setupMouseLook = function () {
     var _this = this;
     this.canvas.addEventListener('mousemove', function(evt) {
       var mousePos = _this.getMousePos(_this.canvas, evt);
       var width = _this.canvas.width;
       var height = _this.canvas.height;
       var cellWidth = width / 3;
       var cellHeight = height / 3;
       if (mousePos.x < cellWidth) {
          _this.yRotation = _this.lookSpeed;
       } else if (mousePos.x > cellWidth * 2) {
            _this.yRotation = -_this.lookSpeed;
       } else {
            _this.yRotation = 0;
       }
       if (mousePos.y < cellHeight) {
          _this.zRotation = _this.lookSpeed;
       } else if (mousePos.y > cellHeight * 2) {
            _this.zRotation = -_this.lookSpeed;
       } else {
            _this.zRotation = 0;
       }
     }, false);
}

// Uses KeyboardState.js:
Player.prototype.move = function () {
     keyboard.update();
     if (keyboard.pressed("left") || keyboard.pressed("A")) {
          this.applyMove("x", -this.strafeSpeed);
     }
     if (keyboard.pressed("right") || keyboard.pressed("D")) {
          this.applyMove("x", this.strafeSpeed);
     }
     if (keyboard.pressed("down") || keyboard.pressed("S")) {
          this.applyMove("z", this.speed);
     }
     if (keyboard.pressed("up") || keyboard.pressed("W")) {
          this.applyMove("z", -this.speed);
     }
}

Player.prototype.applyMove = function (axis, velocity) {
     // Movement code adapted from: http://stackoverflow.com/questions/16201573/how-to-properly-move-the-camera-in-the-direction-its-facing
     if (axis == "z") {
          camera.position.z += Math.cos(this.facing) * velocity;
          camera.position.x += Math.sin(this.facing) * velocity;
     } else if (axis == "x") {
          camera.position.x -= Math.sin(this.facing - Math.PI / 2) * velocity;
          camera.position.z -= Math.cos(this.facing - Math.PI / 2) * velocity;
     }
}

Player.prototype.look = function () {
     camera.rotation.x += this.zRotation;
     camera.rotation.y += this.yRotation;
}
