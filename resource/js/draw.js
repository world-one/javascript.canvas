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
    this.resize();
    this.addEvent();
    this.body.appendChild(this.canvas);
    this.addClearButton();
  }
  
  resize() {
    this.canvas.width = window.innerWidth * 0.9 * 0.8;
    this.canvas.height = window.innerHeight * 0.8;
    window.addEventListener('resize', (e) => {
      this.canvas.width = e.target.innerWidth * 0.9 * 0.8;
      this.canvas.height = e.target.innerHeight * 0.8;
    });
  }

  addClearButton() {
    const clearButton = document.createElement('button');
    clearButton.innerText = '초기화';
    clearButton.className = 'clearCanvasButton';
    clearButton.addEventListener('click', this.clearAll.bind(this));
    this.body.appendChild(clearButton);
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