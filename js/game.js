var Game = {
  canvas : document.createElement("canvas"),
  shapes : [0, 1, 3, 40, 5, 60, 6, 80],
  colors : ['red',
            'green',
            'blue',
            'cyan',
            'magenta',
            'yellow',
            'silver',
            'orange'],
  tiles : [],
  gravity : {
    x: 0,
    y: 0
  },
  stable : true
};

Game.init = function() {
  Game.context = Game.canvas.getContext("2d");
  Game.canvas.width = 512;
  Game.canvas.height = 512;
  document.body.appendChild(Game.canvas);

  for (line = 0; line < 8; line++) {
    for (col = 0; col < 8; col++) {
      Game.tiles.push(new Tile(64*line, 64*col));
    }
  }

  Game.canvas.onmousedown = function (e) {
    if (Game.stable) {
      console.log(Game.gravity);
      var rect = Game.canvas.getBoundingClientRect();
      Game.getTile({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }

  /*Game.canvas.addEventListener('click', function(evt) {
    var rect = Game.canvas.getBoundingClientRect();
    var position = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
    Game.getTile(position);
  }, false);*/

  Game.run();
}

Game.run = function() {
  Game.update();
  Game.draw();
  window.requestAnimationFrame(Game.run);
}

Game.update = function() {
  Game.stable = true;
  Game.tiles.forEach(function(element) {
    element.update();
  });
}

Game.draw = function() {
  Game.context.fillStyle = "black";
  Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
  Game.tiles.forEach(function(element) {
    element.draw();
  });
}

Game.getTile = function(position) {
  console.log(position);
  for (i=0; i<Game.tiles.length; i++) {
    if (Game.tiles[i] &&
        Game.tiles[i].x < position.x &&
        Game.tiles[i].y < position.y &&
        Game.tiles[i].x + 64 > position.x &&
        Game.tiles[i].y + 64 > position.y) {
      console.log(Game.tiles[i]);
      Game.randomG();
      Game.tiles.push(new Tile(Game.tiles[i].x + -1024 * Game.gravity.x, Game.tiles[i].y + -1024 * Game.gravity.y));
      Game.tiles.splice(i, 1);
      //delete Game.tiles[i];
    }
  }
  //console.log(position);
}

Game.isOpen = function(x, y) {
  if (x < 0 ||
      y < 0 ||
      x >= Game.canvas.width ||
      y >= Game.canvas.height) {
    return false;
  }
  for (i=0; i<Game.tiles.length; i++) {
    if (Game.tiles[i] &&
        Game.tiles[i].x <= x &&
        Game.tiles[i].y <= y &&
        Game.tiles[i].x + 64 > x &&
        Game.tiles[i].y + 64 > y) {
      return false;
    }
  }
  return true;
}

Game.randomG = function() {
  var gravities = [{x: 0, y: 0.8},
                   {x: 0, y: -0.8},
                   {x: -0.8, y: 0},
                   {x: 0.8, y: 0},];
  Game.gravity = gravities[Math.floor(Math.random()*4)];
}

// Start the game
Game.init();
