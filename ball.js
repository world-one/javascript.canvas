const canvas_height = 300;
const canvas_width = 500;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Ball{
  
  isBoundX = false;
  isBoundY = false;

  constructor(x, y, radius, speed, color){
    this.x = x;
    this.y = y;
    this.vx = x / speed;
    this.vy = y / speed;
    this.radius = radius;
    this.color = color;
    
    if (x > canvas_width / 2) {
      this.isBoundX = true;
    }
    if (y > canvas_height / 2) {
      this.isBoundY = true;
    }
    // this.draw();
  }

  checkBound(currentPoint, changePoint) {
    return currentPoint < changePoint;
  }

  moveX() {
    const minX = this.radius;
    const maxX = canvas_width - this.radius;

    if (this.isBoundX) {
      this.x += this.vx;
    } else {
      this.x -= this.vx;
    }

    if (this.x <= minX) {
      this.isBoundX = true;
    }

    if (this.x >= maxX) {
      this.isBoundX = false;
    }

  }

  moveY() {
    const minY = this.radius;
    const maxY = canvas_height - this.radius;

    if (this.isBoundY) {
      this.y += this.vy;
    } else {
      this.y -= this.vy;
    }

    if (this.y <= minY) {
      this.isBoundY = true;
    }

    if (this.y >= maxY) {
      this.isBoundY = false;
    }
  }

  draw(){
    this.moveX();
    this.moveY();

    ctx.beginPath();
    ctx.fillStyle=this.color;
    // x, y, radius, startAngle, endAngle, anticlockwise
    ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
    // requestAnimationFrame(this.draw.bind(this));
  }
}

const BALL_COLORS = ['red', 'coral', 'blue', 'yellow', 'green', 'aqua', 'black', 'pink'];

const balls = BALL_COLORS.map((color) => {
  const positionX = getRandomInt(1, 500);
  const positionY = getRandomInt(1, 300);
  const size = getRandomInt();
  const speed = getRandomInt(10, 100);
  return new Ball(positionX, positionY, size, speed, color)
});

function start() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  balls.forEach((item) => {
    item.draw();
  })
  requestAnimationFrame(start);
}

start();

function getRandomInt(min = 10, max = 50) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}