// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'rgb(200,0,0)';
// ctx.fillRect(10, 10, 50, 50);

// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
// ctx.fillRect(30, 30, 50, 50);

// ctx.beginPath();
// ctx.moveTo(75, 50);
// ctx.lineTo(100, 75);
// ctx.lineTo(100, 25);
// ctx.fill();

// ctx.beginPath();
// ctx.moveTo(1, 120);
// ctx.lineTo(1, 150);
// ctx.lineTo(150, 150);
// ctx.lineTo(150, 130);
// ctx.fill();

moveElement();

function moveElement() {
  let start = null;
    const element = document.getElementById('SomeElementYouWantToAnimate');
    element.style.position = 'absolute';

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.left = Math.min(progress / 10, 400) + 'px';
      if (progress < 4000) {
        window.requestAnimationFrame(step);
        return;
      }
      start = timestamp;
      window.requestAnimationFrame(goBack);
    }

    function goBack(timestamp) {
      const progress = timestamp - start;
      element.style.left = Math.max((400 - progress / 10), 0) + 'px';
      if (progress < 4000) {
        window.requestAnimationFrame(goBack);
        return;
      }
      start = null;
      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
}

window.onload = () => {
  new Canvas();
}
class Canvas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.wave = new Wave();
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = 250;
    this.stageHeight = 250;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.wave.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, 250, 250);
    this.wave.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = 0;
    this.max = Math.random() * 100 + 150;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
  }

}

class Wave {
  constructor() {

  }

  resize(w, h) {
    this.stageWidth = w;
    this.stageHeight = h;

    this.centerX = this.stageWidth / 2;
    this.centerY = this.stageHeight / 2;

    this.init();
  }

  init() {
    this.point = new Point(
      this.centerX,
      this.centerY,
    )
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';

    this.point.update();

    ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
    ctx.fill();
  }
}