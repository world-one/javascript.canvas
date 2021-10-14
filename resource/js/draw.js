const LINE_COLORS = ['black', 'red', 'yellow', 'coral', 'green'];

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
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.addEvent();
    this.addColorButtons();
    this.addClearButton();
    this.addEraserButton();
    this.color = 'black';
  }

  setLineColor(color) {
    this.color = color;
    this.position.drawable = true;
    this.finishErase();
    this.addEvent();
  }

  addColorButtons() {
    const contentsWrap = document.getElementById('Contents');
    const buttonsWrap = document.createElement('div');
    buttonsWrap.className = 'color-buttons';
    const buttons = LINE_COLORS.map((color) => {
      const colorButton = document.createElement('button');
      colorButton.innerText = color;
      colorButton.className = `color-button color-button--${color}`;
      colorButton.style = `border-color: ${color}; color: ${color};`
      colorButton.addEventListener('click', this.setLineColor.bind(this, color));
      buttonsWrap.appendChild(colorButton);
    });
  
    contentsWrap.appendChild(buttonsWrap);
  }

  addClearButton() {
    const contentsWrap = document.getElementById('Contents');
    const clearButton = document.createElement('button');
    clearButton.innerText = '초기화';
    clearButton.className = 'clearCanvasButton';
    clearButton.addEventListener('click', this.clearAll.bind(this));
    contentsWrap.appendChild(clearButton);
  }

  addEraserButton() {
    const contentsWrap = document.getElementById('Contents');
    const clearButton = document.createElement('button');
    clearButton.innerText = '지우개';
    clearButton.className = 'clearCanvasButton';
    clearButton.addEventListener('click', this.setEraser.bind(this));
    contentsWrap.appendChild(clearButton);
  }

  addEvent() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (this.position.eraser) return;
      this.ctx.beginPath();
      this.position.drawable = true;
      this.setPosition(e);
      this.ctx.moveTo(this.position.x, this.position.y);
    });

    this.canvas.addEventListener('mousemove', (e) => this.drawLine(this, e));

    this.canvas.addEventListener('mouseup', this.finishDraw.bind(this));
    this.canvas.addEventListener('mouseout',this.finishDraw.bind(this));
  }
  
  drawLine(_, e) {
    if (!this.position.drawable) return;
    this.setPosition(e);
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }

  setPosition(e) {
    this.position.x = e.pageX - this.canvas.offsetLeft;
    this.position.y = e.pageY - this.canvas.offsetTop;
  }

  finishDraw() {
    this.position.drawable = false;
    this.position.x = -1;
    this.position.y = -1;
    this.ctx.closePath();
  }

  clearAll() {
    this.ctx.clearRect(0,0, this.canvas.clientWidth, this.canvas.height);
  }

  removeEventListener() {
    
  }

  setEraser() {
    
    this.canvas.addEventListener('mousedown', (e) => {
      this.position.drawable = false;
      this.position.eraser = true;
    });
  
    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.position.eraser) return;
      this.setPosition(e);
      this.ctx.beginPath();
      this.ctx.arc(this.position.x, this.position.y, 40, 0, 2* Math.PI);
      this.ctx.fillStyle = '#fff';
      this.ctx.strokeStyle = '#fff';
      this.ctx.stroke();
      
      this.ctx.fill();
    });
    this.canvas.addEventListener('mouseup', this.finishErase.bind(this));
    this.canvas.addEventListener('mouseout',this.finishErase.bind(this));
  }
  
  finishErase() {
    this.position.eraser = false;
    this.ctx.closePath();
  }
}

export default Drawing;