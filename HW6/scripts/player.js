/*
 * Author: Isaiah Mann
 * Description: A script to control a player
 */

function Player (camera, canvas, speed, lookSpeed, deceleration) {
     this.camera = camera;
     this.canvas = canvas;
     this.speed = speed;
     this.deceleration = deceleration;
     this.lookSpeed = lookSpeed;
     this.xSpeed = 0;
     this.zSpeed = 0;
     this.zRotation = 0;
     this.yRotation = 0;
     this.setup();
}
Player.prototype = {
     get facing () {
          return this.camera.rotation.y;
     },
}

Player.prototype.setup = function () {
     this.setupKeyMovement();
     this.setupMouseLook();
}

Player.prototype.setupKeyMovement = function () {
     var _this = this;
     document.addEventListener('keydown', function(event) {
        if (event.keyCode == 87) {
             _this.zSpeed = -_this.speed;
        } else if (event.keyCode == 83) {
             _this.zSpeed = _this.speed;
        } else {
             _this.zSpeed = 0;
        }
        if (event.keyCode == 68) {
             _this.xSpeed = _this.speed;
        } else if (event.keyCode == 65) {
             _this.xSpeed = -_this.speed;
        } else {
             _this.xSpeed = 0;
        }
    });
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

Player.prototype.move = function () {
     this.applyMove("x", this.xSpeed);
     this.applyMove("z", this.zSpeed);
     var xDeceleration = null;
     var zDeceleration = null;
     if (this.xSpeed < 0) {
          xDeceleration = -this.deceleration;
     } else if (this.xSpeed > 0) {
          xDeceleration = this.deceleration;
     }
     if (this.zSpeed < 0) {
          zDeceleration = -this.deceleration;
     } else if (this.zSpeed > 0) {
          zDeceleration = this.deceleration;
     }
     if (xDeceleration) {
          this.xSpeed -= xDeceleration;
     }
     if (zDeceleration) {
          this.zSpeed -= zDeceleration;
     }
}

Player.prototype.applyMove = function (axis, velocity) {
     console.log(this.facing);
     if (axis == "z") {
          camera.position.z += velocity;
          if (Math.tan(this.facing) != 0) {
               camera.position.x += velocity / Math.tan(this.facing);
          }
     } else if (axis == "x") {
          camera.position.x += velocity;
          if (Math.tan(this.facing) != 0) {
               camera.position.z += velocity / Math.tan(this.facing - Math.PI / 2);
          }
     }
}

Player.prototype.look = function () {
     camera.rotation.x += this.zRotation;
     camera.rotation.y += this.yRotation;
}
