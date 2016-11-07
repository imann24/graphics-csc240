/*
 * Author: Isaiah Mann
 * Description: A script to control a player
 */

function Player (camera, speed) {
     this.camera = camera;
     this.speed = speed;
     this.xSpeed = 0;
     this.zSpeed = 0;

     this.setup();
}

Player.prototype.setup = function () {
     this.setupMovement();
}

Player.prototype.setupMovement = function () {
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

Player.prototype.move = function () {
     camera.position.x += this.xSpeed;
     camera.position.z += this.zSpeed;
     this.xSpeed = 0;
     this.zSpeed = 0;
}
