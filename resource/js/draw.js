class Drawing {
  
  position = {
    drawable: false,
    x: -1,
    y: -1
  }

  constructor() {
    this.init();
  }

  init() {
    this.body = document.getElementById('Contents');
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas';
    this.ctx = this.canvas.getContext('2d');
    this.body.appendChild(this.canvas);
    this.addEvent();
  }

  addEvent() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.ctx.beginPath();
      this.position.drawable = true;
      this.setPosition(e);
      this.ctx.moveTo(this.position.x, this.position.y);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.position.drawable) return;
      this.setPosition(e);
      this.ctx.lineTo(this.position.x, this.position.y);
      this.ctx.stroke();
    });

    this.canvas.addEventListener('mouseup', this.finishDraw.bind(this));
    this.canvas.addEventListener('mouseout',this.finishDraw.bind(this));
  }
  
  setPosition(e) {
    this.position.x = e.pageX - this.canvas.offsetLeft;
    this.position.y = e.pageY - this.canvas.offsetTop;
  }

  finishDraw() {
    this.position.drawable = false;
    this.position.x = -1;
    this.position.y = -1;
  }

  clearAll() {
    this.ctx.clearRect(0,0, this.canvas.clientWidth, this.canvas.height);
  }
}

export default Drawing;

// function initDrawingCanvas() {
//     const body = document.getElementById('Contents');
//     const canvas = document.createElement('canvas');
//     canvas.id = 'canvas';
//     const ctx = canvas.getContext('2d');
//     body.appendChild(canvas);
// }

// canvas.addEventListener('mousedown', (e) => {
//     ctx.beginPath();
//     position.drawable = true;
//     setPosition(e);
//     ctx.moveTo(position.X, position.Y);
// });

// canvas.addEventListener('mousemove', (e) => {
//     if (!position.drawable) return;
//     setPosition(e);
//     ctx.lineTo(position.X, position.Y);
//     ctx.stroke();
// });

// canvas.addEventListener('mouseup', finishDraw);
// canvas.addEventListener('mouseout',finishDraw);

// function setPosition(e) {
//     position.X = e.pageX - canvas.offsetLeft;
//     position.Y = e.pageY - canvas.offsetTop;
// }

// function finishDraw() {
//     position.drawable = false;
//     position.X = -1;
//     position.Y = -1;
// }

// export function clearAll() {
//     ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
// }