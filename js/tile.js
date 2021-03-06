function Tile(x, y) {
  this.shape = Game.shapes[Math.floor(Math.random()*8)];
  this.color = Game.colors[Math.floor(Math.random()*8)];

  this.x = x;
  this.y = y;
  if (this.x < 0) {
    this.x = -64;
  }
  else if (this.x > 512 - 64) {
    this.x = 512;
  }
  else if (this.y < 0) {
    this.y = -64;
  }
  else if (this.y > 512 - 64) {
    this.y = 512;
  }

  this.speed = {
    x:0,
    y:0
  };
  this.pos= {
    x:this.x,
    y:this.y
  };


  this.update = function() {
    if (Game.isOpen(this.x + 32 + this.speed.x + (Game.gravity.x * 40.01),
                    this.y + 32 + this.speed.y + (Game.gravity.y * 40.01))) {
      Game.isStable = false;
      this.speed.x += Game.gravity.x;
      this.speed.y += Game.gravity.y;
      this.x += this.speed.x;
      this.y += this.speed.y;
    }
    else {
      this.speed.x = 0;
      this.speed.y = 0;
      if (Game.isStable) {
        this.x -= ((this.x + 16) % 64) - 16;
        this.y -= ((this.y + 16) % 64) - 16;
      }
    }
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

    //Game.context.fillStyle = Game.context.strokeStyle = 'white';
    Game.context.fillStyle = Game.context.strokeStyle = 'rgba(255, 255, 255, 0.75)';


    if (this.shape < 3) {
      drawCirc(Game.context, this.x + 32, this.y + 32, 12 + 3*this.shape, this.shape);
    }
    else if (this.shape < 10) {
      drawPolygon(Game.context, this.x + 32, this.y + 32, 24, this.shape, -Math.PI/2, false);
    }
    else {
      drawStar(Game.context, this.x + 32, this.y + 32, 24, this.shape/10);
    }

    Game.context.fillStyle = Game.context.strokeStyle = 'rgba(255, 255, 255, 0.25)';

    Game.context.beginPath();

    Game.context.arc(this.x + 48, this.y + 16, 12, Math.PI*1.5, Math.PI*0);
    Game.context.arc(this.x + 57, this.y + 16, 3, Math.PI*0, Math.PI);
    Game.context.arc(this.x + 48, this.y + 16, 6, Math.PI*0, Math.PI*1.5, true);
    Game.context.arc(this.x + 48, this.y + 7, 3, Math.PI*0.5, Math.PI*1.5);

    Game.context.fill();

    Game.context.fillStyle = Game.context.strokeStyle = 'rgba(0, 0, 0, 0.13)';

    Game.context.beginPath();
    Game.context.arc(this.x + 16, this.y + 10, 10, Math.PI*1.5, Math.PI, true);
    Game.context.lineTo(this.x + 6, this.y + 48);
    Game.context.arc(this.x + 22, this.y + 42, 16, Math.PI, Math.PI*0.5, true);
    Game.context.lineTo(this.x + 58, this.y + 58);
    Game.context.arc(this.x + 54, this.y + 48, 10, Math.PI*0.5, Math.PI*0, true);

    Game.context.lineTo(this.x + 64, this.y + 64);
    Game.context.lineTo(this.x, this.y + 64);
    Game.context.lineTo(this.x, this.y);
    Game.context.fill();

  };
};

function drawPolygon(ctx, x, y, radius, sides, startAngle, anticlockwise) {
  Game.context.beginPath();

  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  a = anticlockwise?-a:a;
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(startAngle);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.restore();

  ctx.fill();
}

function drawStar(ctx, x, y, radius, sides) {
  Game.context.beginPath();
  if (sides < 4 || sides % 2 != 0)
    return;
  var a = (Math.PI * 2)/sides;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 2);
  for (var i = 0; i <= sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i), radius*Math.sin(a*i));
    i++;
    ctx.lineTo(radius*Math.cos(a*i)/3, radius*Math.sin(a*i)/3);
  }
  //ctx.closePath();
  ctx.restore();

  ctx.fill();
}

function drawCirc(ctx, x, y, radius, stroke) {
  Game.context.beginPath();
  Game.context.lineWidth = 6;
  var a = (Math.PI * 2);
  ctx.save();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.restore();

  if (stroke) {
    ctx.stroke();
  }
  else {
    ctx.fill();
  }
  ctx.lineWidth = 1;
}

function drawBall(ctx, x, y, radius) {
  Game.context.beginPath();
  var a = (Math.PI * 2);
  ctx.save();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.restore();

  ctx.fill();
}
