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
    this.color = 'black';
  }

  setLineColor(color) {
    this.color = color;
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
      this.ctx.strokeStyle = this.color;
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