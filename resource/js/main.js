import Drawing from './draw.js';
import { start } from './ball.js';
import Heartbeat from './heartbeat.js';

const URL_HASH = {
  DRAWING: '#drawing',
  BOUNCE_BALL: '#bounceBall',
  HEARTBEAT: '#heartbeat',
};

const CANVAS_ID = 'canvas';

window.onload = (e) => {
  setMenu();
  selectedCanvas(e.path[0].location.hash);
};

function setMenu() {
  const menu = document.querySelector('.menu');
  menu.addEventListener('click', (e) => selectedCanvas(e.target.hash));
};

function selectedCanvas(hash) {
  changeCanvas();

  switch (hash) {
    case URL_HASH.DRAWING:
      new Drawing();
      break;
    case URL_HASH.BOUNCE_BALL:
      start();
      break;
    case URL_HASH.HEARTBEAT:
      new Heartbeat();
      break;
    default:
      start();
      break;
  }
};

function changeCanvas() {
  removeContentChildren();
  setCanvas();
};

function removeContentChildren() {
  const contentsWrap = document.getElementById('Contents');
  while (contentsWrap.hasChildNodes()) {
    contentsWrap.removeChild(contentsWrap.firstChild);
  }
};

function setCanvas() {
  const contentsWrap = document.getElementById('Contents');
  const canvas = document.createElement('canvas');
  canvas.id = CANVAS_ID;
  const ctx = canvas.getContext('2d');
  contentsWrap.appendChild(canvas);
  resize();
};

function resize() {
  setCanvasSize(window);
  window.addEventListener('resize', (e) => setCanvasSize(e.target));
};

function setCanvasSize(wrap) {
  const canvas = document.getElementById(CANVAS_ID);
  canvas.width = wrap.innerWidth * 0.9 * 0.8;
  canvas.height = wrap.innerHeight * 0.8;
};