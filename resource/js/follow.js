export function follow() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const draw = ({ x, y }) => {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(x, y, 25, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }

  const setPosition = (e) => {
    return [ 
      e.pageX - canvas.offsetLeft,
      e.pageY - canvas.offsetTop 
    ];
  }
  
  canvas.addEventListener('mousemove', (e) => {
    const [x, y] = setPosition(e);
    const canvas_width = canvas.width;
    const canvas_height = canvas.height;
    
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas_width, canvas_height);
      draw({x, y});
    }, 100)
    // draw({x, y});
  });


  // return {
  //   draw
  // }
}

export default follow