function Fighter(x, y, color) {
	var rightSpriteHasLoaded = true;
	var leftSpriteHasLoaded = true;
	
	/*this.rightSprite.onload = function() {
		rightSpriteHasLoaded = true;
	}
	this.leftSprite.onload = function() {
		leftSpriteHasLoaded = true;
	}*/
	
	this.rightSprite = new Image();
	this.rightSprite.src = "RyuRight3.png";
	this.leftSprite = new Image();
	this.leftSprite.src = "RyuLeft2.png";
	this.currentSprite = this.rightSprite;
	
	this.color = color;

	this.x = 64;
	this.y = 300;
	this.width = 200;
	this.height = 100;

	this.direction;
	this.STILL = 0;
	this.LEFT = -1;
	this.RIGHT = 1;
	this.direction = this.STILL;

	this.speedX = 8;
	this.speedY = 0;
	this.gravity = .6;

	this.totalImages = 6;
	this.currentImagePos = 0;
	this.subImageWidth = 126;
	this.subImageHeight = 132;
	this.totalImages2 = 11;
	this.subImageHeight2 = 130;
	this.subImageWidth2 = 124;
  
	this.isJumping = false;

	this.move = function() {
		if (this.direction == this.LEFT && this.x > 0) {
			this.x -= this.speedX;
			this.currentImagePos++;
			console.log("moving left");
		} else if (this.direction == this.RIGHT && this.x < canvas.width - this.width) {
			this.x += this.speedX;
			this.currentImagePos++;
			console.log("moving right");
		} else {
				this.currentImagePos = 0;
		}
		this.currentImagePos %= this.totalImages;
		if(this.direction == this.LEFT){
			this.currentSprite = this.leftSprite;
			this.currentImagePos %= this.totalImages;
			console.log("using totalimages 1");
		}
		else if(this.direction == this.RIGHT){
			this.currentSprite = this.rightSprite;	
			this.currentImagePos %= this.totalImages2;	
			console.log("using totalimages 2");
		}
	}

	this.physics = function() {
		this.speedY += this.gravity;
		this.y += this.speedY;
		if (this.y >= 450) {
			this.y = 450;
			this.speedY = 0;
			this.isJumping = false;
		}
	}

	this.jump = function() {
		if (this.isJumping == false) {
			this.speedY = -17;
			this.isJumping = true;
		}
	}

	this.draw = function() {
	if(this.direction == this.LEFT && leftSpriteHasLoaded){//left
			context.drawImage(this.currentSprite, 
			this.currentImagePos*this.subImageWidth, 0,
			this.subImageWidth, this.subImageHeight,
			this.x, this.y, 239, 250);	
			console.log("drawing left");
			console.log(this.currentSprite);
		}	
		else if(this.direction == this.RIGHT && rightSpriteHasLoaded == true){//right
			context.drawImage(this.currentSprite,
			this.currentImagePos*this.subImageWidth2, 0,
			this.subImageWidth2, this.subImageHeight2,
			this.x, this.y, 239, 250);
			console.log("drawing right");
			console.log(this.currentSprite);
		}
	}
}
