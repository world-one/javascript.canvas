export function follow() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const canvas_width = canvas.width;
  const canvas_height = canvas.height;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let avoidBallX = canvas.width / 2;
  let avoidBallY = canvas.height / 2;
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

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(avoidBallX, avoidBallY, 25, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();

    setBallPosition();
    requestAnimationFrame(draw);
  }

  
  
  canvas.addEventListener('mousemove', (e) => {
    const [x, y] = setPosition(e);
    pageX = x;
    pageY = y;
    draw();
  });

  function setBallPosition() {
    const followBallPos = checkEndLine({
      x: ballX + (pageX - ballX) / 10000, 
      y: ballY + (pageY - ballY) / 10000
    });

    ballX = followBallPos.x;
    ballY =followBallPos.y;

    const avoidBallPos = checkEndLine({
      x: avoidBallX - (pageX - avoidBallX) / 10000, 
      y: avoidBallY - (pageY - avoidBallY) / 10000
    });
    avoidBallX = avoidBallPos.x;
    avoidBallY = avoidBallPos.y;
  }

  function setPosition (e) {
    return [ 
      e.pageX - canvas.offsetLeft,
      e.pageY - canvas.offsetTop 
    ];
  }
  function checkEndLine({x, y}) {
    const position = {
      x,
      y
    }
    if (x < 30) {
      position.x = 30;
    }
    if (x > canvas_width - 30) {
      position.x = canvas_width - 30;
    }
    if (y < 30) {
      position.y = 30;
    }
    if (y > canvas_height - 30) {
      position.y = canvas_height - 30;
    }
    return position;
  }
}

export default follow