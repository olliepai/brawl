function Fighter(x, y, side) {
  this.stand = new Image();
  this.forward = new Image();
  this.back = new Image();
  this.jumped = new Image();
  this.punch = new Image();
  this.kick = new Image();

  if (side == "left") {
    this.stand.src = "./sprites/rightStand.png";
  	this.forward.src = "./sprites/rightForward.png";
  	this.back.src = "./sprites/rightBack.png";
  	this.jumped.src = "./sprites/rightJump.png";
    this.punch.src = "./sprites/rightPunch.png";
    this.kick.src = "./sprites/rightKick.png";
  } else if (side == "right") {
    this.stand.src = "./sprites/leftStand.png";
  	this.forward.src = "./sprites/leftForward.png";
  	this.back.src = "./sprites/leftBack.png";
  	this.jumped.src = "./sprites/leftJump.png";
    this.punch.src = "./sprites/leftPunch.png";
    this.kick.src = "./sprites/leftKick.png";
  }

  this.totalImages = 6;
	this.currentImagePos = 0;
	this.subImageWidth = 126;
	this.subImageHeight = 132;
	this.totalImages2 = 11;
	this.subImageHeight2 = 130;
	this.subImageWidth2 = 124;

  this.x = x;
  this.y = y;
  this.width = 239;
  this.height = 250;

  this.hitGround = true;
  this.pushedBack = false;
  this.draggedForward = false;
  this.atEdge = false;

  this.direction;
  this.STILL = 0;
  this.LEFT = -1;
  this.RIGHT = 1;
  this.direction = this.STILL;

  this.speedX = 8;
  this.speedY = 0;
  this.gravity = .6;

  this.isJumping = false;
  this.isAttacking = false;
  this.lightAttacking = false;
  this.heavyAttacking = false;

  this.health = 100;
  this.score = 0;

  this.move = function() {
    if (this.direction == this.LEFT && this.x > 0) {
      this.x -= this.speedX;
      this.currentImagePos++;
    } else if (this.direction == this.RIGHT && this.x < canvas.width - this.width) {
      this.x += this.speedX;
      this.currentImagePos++;
    }
    this.currentImagePos %= this.totalImages;
  }

  this.physics = function() {
    this.speedY += this.gravity;
    this.y += this.speedY;
    if (this.y + this.height >= 690) {
      this.hitGround = true;
      this.y = 690 - this.height;
      this.speedY = 0;
    }
  }

  this.jump = function() {
    if (this.y + this.height >= 690) {
      this.hitGround = false;
      this.speedY = -20;
    }
  }

  this.draw = function() {
    if (this.isAttacking && this.lightAttacking) {
      context.drawImage(this.punch, this.x, this.y, 225, 235);
    } else if (this.isAttacking && this.heavyAttacking) {
      context.drawImage(this.kick, this.x, this.y, 240, 245);
    } else if (this.y + this.height < 690) {
      context.drawImage(this.jumped, this.x, this.y, 190, 235);
    } else if (this.pushedBack || (this.atEdge && (camera.cameraPos > 0 && camera.cameraPos < camera.background.width - canvas.width))) {
      this.currentImagePos++;
      this.currentImagePos %= this.totalImages;
      if (side == "right") {
        context.drawImage(this.back,
    		this.currentImagePos*this.subImageWidth, 0,
    		this.subImageWidth, this.subImageHeight,
    		this.x, this.y, this.width, this.height);
      } else if (side == "left") {
        context.drawImage(this.back,
    		this.currentImagePos*this.subImageWidth, 0,
    		this.subImageWidth, this.subImageHeight,
    		this.x, this.y, this.width, this.height);
      }
    } else if (this.draggedForward && camera.cameraPos > 0 && camera.cameraPos < camera.background.width - canvas.width) {
      this.currentImagePos++;
      this.currentImagePos %= this.totalImages;
      context.drawImage(this.forward,
    	this.currentImagePos*this.subImageWidth2, 0,
    	this.subImageWidth2 - 10, this.subImageHeight2 - 5,
    	this.x, this.y, this.width, this.height);
    } else if (this.direction == this.STILL) {
      context.drawImage(this.stand, this.x, this.y, 190, 235);
    } else if (this.direction == this.LEFT){
      if (side == "right") {
        context.drawImage(this.forward,
    		this.currentImagePos*this.subImageWidth2 - 5, 0,
    		this.subImageWidth2 - 5, this.subImageHeight2 - 5,
    		this.x, this.y, this.width, this.height);
      } else if (side == "left") {
        context.drawImage(this.back,
    		this.currentImagePos*this.subImageWidth, 0,
    		this.subImageWidth, this.subImageHeight,
    		this.x, this.y, this.width, this.height);
      }
  	} else if (this.direction == this.RIGHT) {
      if (side == "right") {
    		context.drawImage(this.back,
    		this.currentImagePos*this.subImageWidth, 0,
    		this.subImageWidth, this.subImageHeight,
    		this.x, this.y, this.width, this.height);
      } else if (side == "left") {
        context.drawImage(this.forward,
    		this.currentImagePos*this.subImageWidth2, 0,
    		this.subImageWidth2, this.subImageHeight2,
    		this.x, this.y, this.width, this.height);
      }
  	}
  }

  this.hits = function(hit) {
    if (this.x + this.width >= hit.x && this.x <= hit.x + hit.width && this.y + this.height >= hit.y && this.y <= hit.y + hit.height) {
      return true;
    }
  }

  this.lightAttack = function(hit) {
    if (this.hits(hit)) {
      hit.health -= 4;
    }
  }

  this.heavyAttack = function(hit) {
    if (this.hits(hit)) {
      hit.health -= 8;
    }
  }
}
