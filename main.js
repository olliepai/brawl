var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var mouseClick = false;

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
document.addEventListener("mousemove", getMousePos);
document.addEventListener("click", function() { mouseClick = true });

var fighter = new Fighter(64, 500, "#25a8ea");
var challenger = new Fighter(1000 - 64 - 50, 500, "#f49242");

var camera = new Camera();

var mouseX;
var mouseY;

var round = 1;

var state;
var MENU_STATE = 0;
var GAME_STATE = 1;
var END_STATE = 3;
var INSTRUCT_STATE = 4;
var CREDIT_STATE = 5;
state = MENU_STATE;

setInterval(run, 1000/60);

function run() {
  this.backTxt = new Image();
  this.backTxt.src = "./assets/BACK.png";
  this.backHitTxt = new Image();
  this.backHitTxt.src = "./assets/BACK-HIT.png";

  if (state == MENU_STATE) {
    camera.drawBackground(fighter, challenger);

    this.brawlTxt = new Image();
    this.brawlTxt.src = "./assets/BRAWL.png";
    context.drawImage(this.brawlTxt, canvas.width / 2 - this.brawlTxt.width / 2, 45, this.brawlTxt.width, this.brawlTxt.height);

    this.playTxt = new Image();
    this.playTxt.src = "./assets/PLAY.png";
    this.playHitTxt = new Image();
    this.playHitTxt.src = "./assets/PLAY-HIT.png";
    context.drawImage(this.playTxt, canvas.width / 2 - this.playTxt.width / 4, 250, this.playTxt.width / 2, this.playTxt.height / 2);
    if (hover(canvas.width / 2 - this.playTxt.width / 4, 250, this.playTxt.width / 2, this.playTxt.height / 2)) {
      context.drawImage(this.playHitTxt, canvas.width / 2 - this.playHitTxt.width / 4, 250, this.playHitTxt.width / 2, this.playHitTxt.height / 2);

      if (mouseClick) {
        state = GAME_STATE;
      }
    }

    this.instructTxt = new Image();
    this.instructTxt.src = "./assets/INSTRUCTIONS.png";
    this.instructHitTxt = new Image();
    this.instructHitTxt.src = "./assets/INSTRUCTIONS-HIT.png";
    context.drawImage(this.instructTxt, canvas.width / 2 - this.instructTxt.width / 4, 375, this.instructTxt.width / 2, this.instructTxt.height / 2);
    if (hover(canvas.width / 2 - this.instructTxt.width / 4, 375, this.instructTxt.width / 2, this.instructTxt.height / 2)) {
      context.drawImage(this.instructHitTxt, canvas.width / 2 - this.instructHitTxt.width / 4, 375, this.instructHitTxt.width / 2, this.instructHitTxt.height / 2);

      if (mouseClick) {
        state = INSTRUCT_STATE;
      }
    }

    this.creditsTxt = new Image();
    this.creditsTxt.src = "./assets/CREDITS.png";
    this.creditsHitTxt = new Image();
    this.creditsHitTxt.src = "./assets/CREDITS-HIT.png";
    context.drawImage(this.creditsTxt, canvas.width / 2 - this.creditsTxt.width / 4, 500, this.creditsTxt.width / 2, this.creditsTxt.height / 2);
    if (hover(canvas.width / 2 - this.creditsTxt.width / 4, 500, this.creditsTxt.width / 2, this.creditsTxt.height / 2)) {
      context.drawImage(this.creditsHitTxt, canvas.width / 2 - this.creditsHitTxt.width / 4, 500, this.creditsHitTxt.width / 2, this.creditsHitTxt.height / 2);

      if (mouseClick) {
        state = CREDIT_STATE;
      }
    }
  }

  else if (state == GAME_STATE) {
    camera.drawBackground(fighter, challenger);
    fighter.physics();
    challenger.physics();
    fighter.move();
    challenger.move();

    // COLLISION DETECTION BETWEEN FIGHTERS
    if (fighter.x + 42 > challenger.x + 8) {
      if (fighter.direction == fighter.RIGHT && challenger.direction == challenger.LEFT) {
        fighter.x -= fighter.speedX;
        challenger.x += challenger.speedX;
      } else if (fighter.direction == fighter.RIGHT && challenger.direction == challenger.STILL) {
        if (challenger.x + challenger.width < canvas.width) {
          challenger.x += challenger.speedX;
        } else if (camera.cameraPos < camera.background.width - canvas.width) {
          camera.scrollRight(challenger, fighter);
        } else {
          fighter.x -= fighter.speedX;
        }
      } else if (challenger.x + challenger.width >= canvas.width) {
        fighter.x -= fighter.speedX;
      }
      else if (fighter.direction == fighter.STILL && challenger.direction == challenger.LEFT) {
        if (fighter.x > 0) {
          fighter.x -= fighter.speedX;
        } else if (camera.cameraPos > 0) {
          camera.scrollLeft(fighter, challenger);
        } else {
          challenger.x += challenger.speedX;
        }
      } else if (fighter.x <= 0) {
        challenger.x += challenger.speedX;
      }
    }

    fighter.draw();
    challenger.draw();
    score();
  }

  else if (state == END_STATE) {
    camera.drawBackground(fighter, challenger);

    if (fighter.score > challenger.score) {
      this.fighterWinsTxt = new Image();
      this.fighterWinsTxt.src = "./assets/FIGHTER--WINS.png";
      context.drawImage(this.fighterWinsTxt, canvas.width / 2 - this.fighterWinsTxt.width / 3, 300, this.fighterWinsTxt.width / 1.5, this.fighterWinsTxt.height / 1.5);
    } else if (challenger.score > fighter.score) {
      this.challengerWinsTxt = new Image();
      this.challengerWinsTxt.src = "./assets/CHALLENGER--WINS.png";
      context.drawImage(this.challengerWinsTxt, canvas.width / 2 - this.challengerWinsTxt.width / 3, 300, this.challengerWinsTxt.width / 1.5, this.challengerWinsTxt.height / 1.5);
    }

    context.drawImage(this.backTxt, 825, 650, this.backTxt.width / 2, this.backTxt.height / 2);
    if (hover(825, 650, this.backTxt.width / 2, this.backTxt.height / 2)) {
      context.drawImage(this.backHitTxt, 825, 650, this.backHitTxt.width / 2, this.backHitTxt.height / 2);

      if (mouseClick) {
        state = MENU_STATE;
      }
    }
  }

  else if (state == INSTRUCT_STATE) {
    camera.drawBackground(fighter, challenger);

    this.playerOneTxt = new Image();
    this.playerOneTxt.src = "./assets/PLAYER--1.png";
    context.drawImage(this.playerOneTxt, canvas.width / 2 - this.playerOneTxt.width / 4, 250, this.playerOneTxt.width / 2, this.playerOneTxt.height / 2);
    this.playerTwoTxt = new Image();
    this.playerTwoTxt.src = "./assets/PLAYER--2.png";
    context.drawImage(this.playerTwoTxt, canvas.width / 2 - this.playerTwoTxt.width / 4, 375, this.playerTwoTxt.width / 2, this.playerTwoTxt.height / 2);

    context.drawImage(this.backTxt, 825, 650, this.backTxt.width / 2, this.backTxt.height / 2);
    if (hover(825, 650, this.backTxt.width / 2, this.backTxt.height / 2)) {
      context.drawImage(this.backHitTxt, 825, 650, this.backHitTxt.width / 2, this.backHitTxt.height / 2);

      if (mouseClick) {
        state = MENU_STATE;
      }
    }
  }

  else if (state == CREDIT_STATE) {
    camera.drawBackground(fighter, challenger);

    this.nameTxt = new Image();
    this.nameTxt.src = "./assets/NAMES.png";
    context.drawImage(this.nameTxt, canvas.width / 2 - this.nameTxt.width / 6, 300, this.nameTxt.width / 3, this.nameTxt.height / 3);
    this.dateTxt = new Image();
    this.dateTxt.src = "./assets/DATE.png";
    context.drawImage(this.dateTxt, canvas.width / 2 - this.dateTxt.width / 6, 375, this.dateTxt.width / 3, this.dateTxt.height / 3);

    context.drawImage(this.backTxt, 825, 650, this.backTxt.width / 2, this.backTxt.height / 2);
    if (hover(825, 650, this.backTxt.width / 2, this.backTxt.height / 2)) {
      context.drawImage(this.backHitTxt, 825, 650, this.backHitTxt.width / 2, this.backHitTxt.height / 2);

      if (mouseClick) {
        state = MENU_STATE;
      }
    }
  }

  mouseClick = false;
}

function keyDown(event) {
  if (event.key == 'a' && fighter.direction != fighter.LEFT) {
    fighter.direction = fighter.LEFT;
  } else if (event.key == 'd' && fighter.direction != fighter.RIGHT) {
    fighter.direction = fighter.RIGHT;
  } else if (event.key == 'w' && !fighter.isJumping) {
    fighter.isJumping = true;
    fighter.jump();
  } else if (event.key == 'c' && !fighter.isAttacking && (challenger.direction != challenger.RIGHT || challenger.x + challenger.width >= 1000)) {
    fighter.isAttacking = true;
    fighter.lightAttack(challenger);
  } else if (event.key == 'v' && !fighter.isAttacking && (challenger.direction != challenger.RIGHT || challenger.x + challenger.width >= 1000)) {
    fighter.isAttacking = true;
    fighter.heavyAttack(challenger);
  }

  if (event.key == 'j' && challenger.direction != challenger.LEFT) {
    challenger.direction = challenger.LEFT;
  } else if (event.key == 'l' && challenger.direction != challenger.RIGHT) {
    challenger.direction = challenger.RIGHT;
  } else if (event.key == 'i' && !challenger.isJumping) {
    challenger.isJumping = true;
    challenger.jump();
  } else if (event.key == 'n' && !challenger.isAttacking && (fighter.direction != fighter.LEFT || fighter.x <= 0)) {
    challenger.isAttacking = true;
    challenger.lightAttack(fighter);
    console.log("light");
  } else if (event.key == 'b' && !challenger.isAttacking && (fighter.direction != fighter.LEFT || fighter.x <= 0)) {
    challenger.isAttacking = true;
    challenger.heavyAttack(fighter);
    console.log("heavy");
  }

  if (event.key == 'q') {
    state = MENU_STATE;
    round = 1;
    fighter.score = 0, challenger.score = 0;
    fighter.health = 100;
    challenger.health = 100;
    fighter.x = 64, fighter.y = 500;
    challenger.x = 1000 - 64 - 50, challenger.y = 500;
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
  if (round >= 4) {
    state = END_STATE;
    round = 1;
    fighter.score = 0;
    challenger.score = 0;
  }
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

function getMousePos(event) {
  mouseX = event.clientX - canvas.offsetLeft;
  mouseY = event.clientY - canvas.offsetTop;
}

function hover(x, y, width, height) {
  if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
    return true;
  } else {
    return false;
  }
}

function checkOverlap() {
  if (fighter.x + 45 + 8 > challenger.x) {
    fighter.x = fighter.x - fighter.speedX;
    challenger.x = challenger.x + fighter.speedX;
  }
}
