class Drawing {

  position = {
    drawable: false,
    x: -1,
    y: -1
  }

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.setCanvasSize();
    this.addEvent();
    this.poi
  }

  setCanvasSize() {
    this.canvas.width = 500;
    this.canvas.height = 500;
  }
  addEvent() {
    this.canvas.addEventListener('click', (e) => {
      this.draw(e);
    });
  }
  draw(e) {
    this.ctx.beginPath();
    this.position.x = e.pageX - this.canvas.offsetLeft;
    this.position.y = e.pageY - this.canvas.offsetTop;
    this.ctx.moveTo(this.position.x, this.position.y);

    this.move();
  }

  move() {
    if (this.position.y > 500) return;
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
    // this.position.x += 1;
    this.position.y += 1;
    requestAnimationFrame(this.move.bind(this));
  }
}

const canvas = document.getElementById('Canvas');
new Drawing(canvas)