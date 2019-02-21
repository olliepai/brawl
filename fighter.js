function Fighter(x, y, color) {
  this.color = color;

  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;

  this.direction;
  this.STILL = 0;
  this.LEFT = -1;
  this.RIGHT = 1;
  this.direction = this.STILL;

  this.speedX = 8;
  this.speedY = 0;
  this.gravity = .6;

  this.isJumping = false;

  this.health = 100;

  this.move = function() {
    if (this.direction == this.LEFT && this.x > 0) {
      this.x -= this.speedX;
    } else if (this.direction == this.RIGHT && this.x < canvas.width - this.width) {
      this.x += this.speedX;
    }
  }

  this.physics = function() {
    this.speedY += this.gravity;
    this.y += this.speedY;
    if (this.y + 50 >= 660) {
      this.y = 610;
      this.speedY = 0;
      this.isJumping = false;
    }
  }

  this.jump = function() {
    if (this.isJumping == false) {
      this.speedY = -10;
      this.isJumping = true;
    }
  }

  this.draw = function() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  this.lightAttack = function(hit) {
    if (this.hits(hit)) {
      hit.health -= 1;
      console.log(hit.health);
    }
  }

  this.hits = function(hit) {
    if (this.x + this.width >= hit.x && this.x <= hit.x + hit.width && this.y + this.height >= hit.y && this.y <= hit.y + hit.height) {
      return true;
    }
  }
}
