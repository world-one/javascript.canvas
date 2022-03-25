class Drawing {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.addEvent();
  }

  addEvent() {
    this.canvas.addEventListener('click', (e) => {
      this.ctx.lineTo(e.pageX, e.pageY);
      this.ctx.strokeStyle = 'red';
      this.ctx.stroke();
    });
  }


}

const canvas = document.getElementById('Canvas');
new Drawing(canvas)