export function follow() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const canvas_width = canvas.width;
  const canvas_height = canvas.height;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let pageX = 0;
  let pageY = 0;
  init();
  function init() {
    draw();
  }

  
  function draw () {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(ballX, ballY, 25, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    setBallPosition();
    requestAnimationFrame(draw);
  }

  
  
  canvas.addEventListener('mousemove', (e) => {
    const [x, y] = setPosition(e);
    pageX = x;
    pageY = y;
    const canvas_width = canvas.width;
    const canvas_height = canvas.height;
    draw();
  });

  function setBallPosition() {
    ballX = ballX + (pageX - ballX) / 10000;
    ballY = ballY + (pageY - ballY) / 10000;
  }

  function setPosition (e) {
    return [ 
      e.pageX - canvas.offsetLeft,
      e.pageY - canvas.offsetTop 
    ];
  }
}

export default follow