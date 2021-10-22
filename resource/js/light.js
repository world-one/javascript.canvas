export function light(x, y, radius, color) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.save();
  const rnd = 0.03 * Math.sin(1.1 * Date.now() / 1000);
  radius = radius * (1 + rnd);
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = '#0B0B00';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.90+rnd, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.4+rnd, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  // const rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
  radius = radius * (1 + rnd);
  const radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  radialGradient.addColorStop(0.0, '#BB9');
  radialGradient.addColorStop(0.2 + rnd, '#AA8');
  radialGradient.addColorStop(0.7 + rnd, '#330');
  radialGradient.addColorStop(0.90, '#110');
  radialGradient.addColorStop(1, '#000');
  ctx.fillStyle = radialGradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}