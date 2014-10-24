function Tile(x, y) {
  this.shape = Game.shapes[Math.floor(Math.random()*8)];
  this.color = Game.colors[Math.floor(Math.random()*8)];
  this.x = x;
  this.y = y;
  this.speed = {
    x:0,
    y:0
  };
  this.pos= {
    x:this.x,
    y:this.y
  };


  this.update = function() {
    this.speed.x += Game.gravity.x;
    this.speed.y += Game.gravity.y;
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  this.draw = function() {
    radius = 16;
    width = height = 64;
    Game.context.fillStyle = this.color;

    Game.context.beginPath();
    Game.context.moveTo(this.x + radius, this.y);
    Game.context.lineTo(this.x + width - radius, this.y);
    Game.context.quadraticCurveTo(this.x + width, this.y, this.x + width, this.y + radius);
    Game.context.lineTo(this.x + width, this.y + height - radius);
    Game.context.quadraticCurveTo(this.x + width, this.y + height, this.x + width - radius, this.y + height);
    Game.context.lineTo(this.x + radius, this.y + height);
    Game.context.quadraticCurveTo(this.x, this.y + height, this.x, this.y + height - radius);
    Game.context.lineTo(this.x, this.y + radius);
    Game.context.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
    Game.context.closePath();
    //context.stroke();
    Game.context.fill();
  };
};
