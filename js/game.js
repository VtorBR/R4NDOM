var Game = {
  canvas : document.createElement("canvas"),
  shapes : ['triangle', 'square', 'pentagon', 'hexagon', 'octagon', '', '', '', 'circle'],
  colors : ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow', 'purple', 'orange'],
  tiles : [],
  gravity: {
    x: 0,
    y: 0
  }
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

  Game.run();
}

Game.run = function() {
  Game.update();
  Game.draw();
  window.requestAnimationFrame(Game.run);
}

Game.update = function() {
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

// Start the game
Game.init();
