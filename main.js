var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

var fighter = new Fighter(64, 500, "#25a8ea");
var challenger = new Fighter(1000 - 64 - 50, 500, "#f49242");

var camera = new Camera();

setInterval(run, 1000/60);

function run() {
  camera.drawBackground(fighter, challenger);
  fighter.physics();
  challenger.physics();
  fighter.move();
  challenger.move();
  fighter.draw();
  challenger.draw();
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
