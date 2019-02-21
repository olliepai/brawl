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
  } else if (event.key == 'w') {
    fighter.jump();
  } else if (event.key == 'c') {
    fighter.lightAttack(challenger);
  }

  if (event.key == 'j' && challenger.direction != challenger.LEFT) {
    challenger.direction = challenger.LEFT;
  } else if (event.key == 'l' && challenger.direction != challenger.RIGHT) {
    challenger.direction = challenger.RIGHT;
  } else if (event.key == 'i') {
    challenger.jump();
  }
}

function keyUp(event) {
  if (event.key == 'a' && fighter.direction == fighter.LEFT) {
    fighter.direction = fighter.STILL;
  } else if (event.key == 'd' && fighter.direction == fighter.RIGHT) {
    fighter.direction = fighter.STILL;
  } else if (event.key == 'c') {
    fighter.color = "#25a8ea";
  }

  if (event.key == 'j' && challenger.direction == challenger.LEFT) {
    challenger.direction = challenger.STILL;
  } else if (event.key == 'l' && challenger.direction == challenger.RIGHT) {
    challenger.direction = challenger.STILL;
  }
}
