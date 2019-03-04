var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

var fighter = new Fighter(64, 500, "#25a8ea");
var challenger = new Fighter(1000 - 64 - 50, 500, "#f49242");

var camera = new Camera();

var round = 1;

setInterval(run, 1000/60);

function run() {
  camera.drawBackground(fighter, challenger);
  fighter.physics();
  challenger.physics();
  fighter.move();
  challenger.move();
  fighter.draw();
  challenger.draw();
  score();
}

function keyDown(event) {
  if (event.key == 'a' && fighter.direction != fighter.LEFT) {
    fighter.direction = fighter.LEFT;
  } else if (event.key == 'd' && fighter.direction != fighter.RIGHT) {
    fighter.direction = fighter.RIGHT;
  } else if (event.key == 'w' && !fighter.isJumping) {
    fighter.isJumping = true;
    fighter.jump();
  } else if (event.key == 'c' && !fighter.isAttacking && challenger.direction != challenger.RIGHT) {
    fighter.isAttacking = true;
    fighter.lightAttack(challenger);
  } else if (event.key == 'v' && !fighter.isAttacking && challenger.direction != challenger.RIGHT) {
    fighter.isAttacking = true;
    fighter.heavyAttack(challenger);
    console.log(challenger.direction);
  }

  if (event.key == 'j' && challenger.direction != challenger.LEFT) {
    challenger.direction = challenger.LEFT;
  } else if (event.key == 'l' && challenger.direction != challenger.RIGHT) {
    challenger.direction = challenger.RIGHT;
  } else if (event.key == 'i' && !challenger.isJumping) {
    challenger.isJumping = true;
    challenger.jump();
  } else if (event.key == 'n' && !challenger.isAttacking && fighter.direction != fighter.LEFT) {
    challenger.isAttacking = true;
    challenger.lightAttack(fighter);
  } else if (event.key == 'b' && !challenger.isAttacking && fighter.direction != fighter.LEFT) {
    challenger.isAttacking = true;
    challenger.heavyAttack(fighter);
  }
}

function keyUp(event) {
  if (event.key == 'a' && fighter.direction == fighter.LEFT) {
    fighter.direction = fighter.STILL;
  } else if (event.key == 'd' && fighter.direction == fighter.RIGHT) {
    fighter.direction = fighter.STILL;
  } else if (event.key == 'w') {
    fighter.isJumping = false;
  } else if (event.key == 'c' && fighter.isAttacking) {
    fighter.isAttacking = false;
  } else if (event.key == 'v' && fighter.isAttacking) {
    fighter.isAttacking = false;
  }

  if (event.key == 'j' && challenger.direction == challenger.LEFT) {
    challenger.direction = challenger.STILL;
  } else if (event.key == 'l' && challenger.direction == challenger.RIGHT) {
    challenger.direction = challenger.STILL;
  } else if (event.key == 'i') {
    challenger.isJumping = false;
  } else if (event.key == 'n' && challenger.isAttacking) {
    challenger.isAttacking = false;
  } else if (event.key == 'b' && challenger.isAttacking) {
    challenger.isAttacking = false;
  }
}

function score() {
  // ACTUAL SCORING MECHANICS

  if (fighter.health <= 0) {
    round++;
    challenger.score++;
    fighter.health = 100;
    challenger.health = 100;
    fighter.x = 64, fighter.y = 500;
    challenger.x = 1000 - 64 - 50, challenger.y = 500;
  } else if (challenger.health <= 0) {
    round++;
    fighter.score++;
    fighter.health = 100;
    challenger.health = 100;
    fighter.x = 64, fighter.y = 500;
    challenger.x = 1000-64 - 50, challenger.y = 500;
  }

  // GRAPHICS STUFF
  this.roundOneTxt = new Image();
  this.roundOneTxt.src = "./assets/ROUND--1.png";
  this.roundTwoTxt = new Image();
  this.roundTwoTxt.src = "./assets/ROUND--2.png";
  this.roundThreeTxt = new Image();
  this.roundThreeTxt.src = "./assets/ROUND--3.png";

  if (round == 1) {
    context.drawImage(this.roundOneTxt, canvas.width / 2 - roundOneTxt.width / 3.5, 25, roundOneTxt.width / 1.75, roundOneTxt.height / 1.75);
  } else if (round == 2) {
    context.drawImage(this.roundTwoTxt, canvas.width / 2 - roundTwoTxt.width / 3.5, 25, roundTwoTxt.width / 1.75, roundTwoTxt.height / 1.75);
  } else if (round == 3) {
    context.drawImage(this.roundThreeTxt, canvas.width / 2 - roundThreeTxt.width / 3.5, 25, roundThreeTxt.width / 1.75, roundThreeTxt.height / 1.75);
  }

  context.strokeStyle = "#ffffff";
  context.lineWidth = 4;
  context.strokeRect(25, 25, 250, 25);
  context.strokeRect(canvas.width - 25 - 250, 25, 250, 25);

  context.fillStyle = "#f24141";
  context.fillRect(29, 29, 242 * (fighter.health / 100), 17);
  context.fillRect(canvas.width - 29, 29, -242 * (challenger.health / 100), 17);

  this.fighterTxt = new Image();
  this.fighterTxt.src = "./assets/FIGHTER.png";
  context.drawImage(this.fighterTxt, 20, 65, fighterTxt.width / 3, fighterTxt.height / 3);

  this.challengerTxt = new Image();
  this.challengerTxt.src = "./assets/CHALLENGER.png";
  context.drawImage(this.challengerTxt, canvas.width - challengerTxt.width / 3 - 20, 65, challengerTxt.width / 3, challengerTxt.height / 3);

  this.scoreZeroTxt = new Image();
  this.scoreZeroTxt.src = "./assets/-0-.png";
  this.scoreOneTxt = new Image();
  this.scoreOneTxt.src = "./assets/-1-.png";
  this.scoreTwoTxt = new Image();
  this.scoreTwoTxt.src = "./assets/-2-.png";
  this.scoreThreeTxt = new Image();
  this.scoreThreeTxt.src = "./assets/-3-.png";

  if (fighter.score == 0) {
    context.drawImage(this.scoreZeroTxt, 20, 100, scoreZeroTxt.width / 5, scoreZeroTxt.height / 5);
  } else if (fighter.score == 1) {
    context.drawImage(this.scoreOneTxt, 20, 100, scoreOneTxt.width / 5, scoreOneTxt.height / 5);
  } else if (fighter.score == 2) {
    context.drawImage(this.scoreTwoTxt, 20, 100, scoreTwoTxt.width / 5, scoreTwoTxt.height / 5);
  } else if (fighter.score == 3) {
    context.drawImage(this.scoreThreeTxt, 20, 100, scoreThreeTxt.width / 5, scoreThreeTxt.height / 5);
  }

  if (challenger.score == 0) {
    context.drawImage(this.scoreZeroTxt, canvas.width - scoreZeroTxt.width / 5 - 20, 100, scoreZeroTxt.width / 5, scoreZeroTxt.height / 5);
  } else if (challenger.score == 1) {
    context.drawImage(this.scoreOneTxt, canvas.width - scoreOneTxt.width / 5 - 20, 100, scoreOneTxt.width / 5, scoreOneTxt.height / 5);
  } else if (challenger.score == 2) {
    context.drawImage(this.scoreTwoTxt, canvas.width - scoreTwoTxt.width / 5 - 20, 100, scoreTwoTxt.width / 5, scoreTwoTxt.height / 5);
  } else if (challenger.score == 3) {
    context.drawImage(this.scoreThreeTxt, canvas.width - scoreThreeTxt.width / 5 - 20, 100, scoreThreeTxt.width / 5, scoreThreeTxt.height / 5);
  }

  //console.log("fighter health ~" + fighter.health + "\nchallenger health ~" + challenger.health);
}
