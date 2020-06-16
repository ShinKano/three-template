// vertex shader ( 頂点シェーダー )
// このファイルに各頂点ごとの処理を記述します

// 変数
varying vec2 vUv;

void main() {
  vUv = uv;// uv: ShaderMaterialで補完される vec2 型(xy)の変数。テクスチャ座標のこと。

  gl_Position = vec4( position, 1.0 );
}