import * as THREE from 'three';
import Canvas from './Canvas';

window.addEventListener('DOMContentLoaded', () => {

  // canvasを作成
  const canvas = new Canvas();
  
  // マウス座標を取得
  window.addEventListener('mousemove', e => {
    canvas.mouseMoved(e.clientX, e.clientY);
  });

  // スクロール量を取得
  window.addEventListener('scroll', e => {
    canvas.scrolled(window.scrollY);
  });
});