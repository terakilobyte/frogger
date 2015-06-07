var Entity = function(x, y, sprite, speed) {
  this.xConstant = 101;
  this.yConstant = 83;
  this.x = x;
  this.y = y;
}


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.speed = speed || 1;
  Entity.call(this, x, y, speed);
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x >= 4) {
    this.x = 0;
  } else {
    this.x += this.speed * dt;
  }
  this.render();
}

Enemy.prototype.checkCollision = function() {
  // if (this.x - 100 === player.x &&
  //   this.y === player.y) {
  //   player.x = 2;
  //   player.y = 5;
  // };

  if ((player.x <= this.x + .5 && player.x >= this.x - .5) &&
    (player.y === this.y)) {
    player.x = 2;
    player.y = 5;
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.x * this.xConstant,
    this.y * this.yConstant
  );
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.sprite = 'images/char-boy.png';
  Entity.call(this, x, y, speed);
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt) {}

Player.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.x * this.xConstant,
    this.y * this.yConstant);
};

Player.prototype.handleInput = function(which) {
  var move = {
    left: function() {
      if (this.x <= 0) {
        return;
      }
      this.x -= 1;
    },

    up: function() {
      if (this.y <= 1) {
        return this.y = 5;
      }
      this.y -= 1;
    },

    right: function() {
      if (this.x >= 4) {
        return;
      }
      this.x += 1;
    },

    down: function() {
      if (this.y >= 5) {
        return;
      }
      this.y += 1;
    }
  };

  return move[which].bind(this)();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

[1, 2, 3].forEach(function(elem) {
  allEnemies.push(new Enemy(0, elem, (Math.max(Math.random() * 2, 1))));
});

var player = new Player(2, 5);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
