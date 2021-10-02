
const position = {
    drawable: false,
    x: -1,
    y: -1
}

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', (e) => {
    ctx.beginPath();
    position.drawable = true;
    setPosition(e);
    ctx.moveTo(position.X, position.Y);
});

canvas.addEventListener('mousemove', (e) => {
    if (!position.drawable) return;
    setPosition(e);
    ctx.lineTo(position.X, position.Y);
    ctx.stroke();
});

canvas.addEventListener('mouseup', finishDraw);
canvas.addEventListener('mouseout',finishDraw);

function setPosition(e) {
    position.X = e.pageX - canvas.offsetLeft;
    position.Y = e.pageY - canvas.offsetTop;
}

function finishDraw() {
    position.drawable = false;
    position.X = -1;
    position.Y = -1;
}

export function clearAll() {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
}