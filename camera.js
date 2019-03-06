function Camera() {
  this.background = new Image();
  this.background.src = "./assets/bathhouse.png";
  this.cameraPos = (1867 / 2) - (canvas.width / 2) - 25;
  this.cameraSpeed = fighter.speedX;

  this.direction;
  this.SCROLL_LEFT = -1;
  this.SCROLL_RIGHT = 1;
  this.STILL = 0;
  this.direction = this.STILL;

  this.scrollLeft = function(hitWall, noHitWall) {
    this.direction = this.SCROLL_LEFT;
    this.cameraPos -= this.cameraSpeed;
    hitWall.x = 0;
    if (this.cameraPos > 0 && noHitWall.x < canvas.width - noHitWall.width) {
      noHitWall.x += noHitWall.speedX;
    }

    if (this.cameraPos <= 0) {
      this.cameraPos = 0;
    }
  }

  this.scrollRight = function(hitWall, noHitWall) {
    this.direction = this.SCROLL_RIGHT;
    this.cameraPos += this.cameraSpeed;
    hitWall.x = canvas.width - hitWall.width;
    if (this.cameraPos < this.background.width - canvas.width && noHitWall.x > 0) {
      noHitWall.x -= noHitWall.speedX;
    }

    if (this.cameraPos >= this.background.width - canvas.width) {
      this.cameraPos = this.background.width - canvas.width;
    }
  }

  this.drawBackground = function(fighter, challenger) {
    this.direction = this.STILL;

    context.drawImage(this.background,
      this.cameraPos, 0, canvas.width, this.background.height,
      0, 0, canvas.width, canvas.height);

    if (!((fighter.x <= 0 && fighter.direction == fighter.LEFT && this.direction != this.SCROLL_RIGHT && challenger.x + challenger.width >= canvas.width && challenger.direction == challenger.RIGHT && this.direction != this.SCROLL_LEFT)
      || (fighter.x + fighter.width >= canvas.width && fighter.direction == fighter.RIGHT && this.direction != this.SCROLL_LEFT && challenger.x <= 0 && challenger.direction == challenger.LEFT && this.direction != this.SCROLL_RIGHT))) {
      if (fighter.x <= 0 && fighter.direction == fighter.LEFT && this.direction != this.SCROLL_RIGHT) {
        this.scrollLeft(fighter, challenger);
      } else if (fighter.x + fighter.width >= canvas.width && fighter.direction == fighter.RIGHT && this.direction != this.SCROLL_LEFT) {
        this.scrollRight(fighter, challenger);
      } else if (challenger.x <= 0 && challenger.direction == challenger.LEFT && this.direction != this.SCROLL_RIGHT) {
        this.scrollLeft(challenger, fighter);
      } else if (challenger.x + challenger.width >= canvas.width && challenger.direction == challenger.RIGHT && this.direction != this.SCROLL_LEFT) {
        console.log(challenger.direction);
        this.scrollRight(challenger, fighter);
      }
    }
  }
}
