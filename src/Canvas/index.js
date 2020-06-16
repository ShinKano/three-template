import * as THREE from 'three';
// シェーダーソース
import vertexSource from './shaders/shader.vert';
import fragmentSource from './shaders/shader.frag';

export default class Canvas {
  constructor() {
    // マウス座標
    this.mouse = new THREE.Vector2(0, 0);
    // スクロール量
    this.scrollY = 0;
    // ウィンドウサイズ
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // レンダラーを作成
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.w, this.h);// 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比

    // #canvas-containerにレンダラーのcanvasを追加
    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);


    // ウィンドウサイズの平面がぴったり収まるカメラ距離（dist）を計算
    const fov    = 60; // 視野角
    const fovRad = (fov / 2) * (Math.PI / 180);// 視野角をラジアンに変換
    const dist   = (this.h / 2) / Math.tan(fovRad);// ウィンドウぴったりのカメラ距離

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new THREE.PerspectiveCamera(fov, this.w / this.h, 1, dist * 2);
    this.camera.position.z = dist;// カメラを遠ざける


    // シーンを作成
    this.scene = new THREE.Scene();

    // ライトを作成
    this.light = new THREE.PointLight(0x00ffff);
    this.light.position.set(0, 0, 400);// ライトの初期位置を設定

    // ライトをシーンに追加
    this.scene.add(this.light);

    // ---------- 立方体のサンプル
    // // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
    // const geo = new THREE.BoxGeometry(300, 300, 300);

    // // マテリアルを作成
    // const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });

    // // ジオメトリとマテリアルからメッシュを作成
    // this.mesh = new THREE.Mesh(geo, mat);
    // // メッシュを回転させる
    // this.mesh.rotation.x = THREE.MathUtils.DEG2RAD * 25;
    // this.mesh.rotation.y = THREE.MathUtils.DEG2RAD * 45;


    // ---------- 自作シェーダーのサンプル
    // 平面をつくる（幅, 高さ, 横分割数, 縦分割数）
    const geo = new THREE.PlaneGeometry(2, 2, 10, 10);

    // シェーダーソースを渡してマテリアルを作成
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(geo, mat);

    // メッシュをシーンに追加
    this.scene.add(this.mesh);

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
    // アニメーション描画ループ開始
    this.render();
  }


  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => { this.render(); });
    // ミリ秒から秒に変換
    const sec = performance.now() / 1000;

    // 1秒で45°回転する
    this.mesh.rotation.x = sec * (Math.PI / 4);
    this.mesh.rotation.y = sec * (Math.PI / 4);

    // スクロール量より少なく動く
    this.mesh.position.y = this.scrollY * 0.5;

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }


  // ---------- その他関数 ----------

  // マウス座標を取得
  // 画面の中心が原点（0, 0）なので、計算が必要
  mouseMoved(x, y) {
    this.mouse.x =  x - (this.w / 2);// 原点を中心に持ってくる
    this.mouse.y = -y + (this.h / 2);// 軸を反転して原点を中心に持ってくる

    // ライトの xy座標 をマウス位置にする
    this.light.position.x = this.mouse.x;
    this.light.position.y = this.mouse.y;
  }

  // スクロール量を取得
  scrolled(y) {
    this.scrollY = y;
    console.log(this.scrollY);
  }
};