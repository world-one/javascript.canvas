import Drawing from './draw.js';
import { start } from './ball.js';
import Heartbeat from './heartbeat.js';

window.onload = (e) => {
  setCanvas();
  const hash = e.path[0].location.hash;
  if (hash === '#drawing') {
    new Drawing();
  } else if (hash === '#bounceBall') {
      start();
  } else {
    new Drawing();
  }
};

const menu = document.querySelector('.menu');
menu.addEventListener('click', (e) => {
  const hash = e.target.hash;
  if (hash === '#drawing') {
    changeCanvas();
    new Drawing();
  } else if (hash === '#bounceBall') {
    changeCanvas();
    start();

  } else if (hash === '#heartbeat') {
    changeCanvas();
    new Heartbeat();
  }
  
});

function changeCanvas() {
  removeContentChildren();
  setCanvas();
}

function removeContentChildren() {
  const contentsWrap = document.getElementById('Contents');
  while (contentsWrap.hasChildNodes()) {
    contentsWrap.removeChild(contentsWrap.firstChild);
  }
}

function setCanvas() {
  const contentsWrap = document.getElementById('Contents');
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  const ctx = canvas.getContext('2d');
  contentsWrap.appendChild(canvas);
  resize();
}

function resize() {
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth * 0.9 * 0.8;
  canvas.height = window.innerHeight * 0.8;
  window.addEventListener('resize', (e) => {
    canvas.width = e.target.innerWidth * 0.9 * 0.8;
    canvas.height = e.target.innerHeight * 0.8;
  });
}
