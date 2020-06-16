// vertex shader ( 頂点シェーダー )
// このファイルに各頂点ごとの処理を記述します

void main() {
  vec3 pos = position;// position: ShaderMaterialで補完される vec3 型(xyz)の変数。ジオメトリの頂点のこと。
  // pos.y = ( pos.y * 0.5 ) + sin( pos.x * 3.0 ) * 0.5;// 縦を半分のサイズにして、sinでy座標を歪ませる
  gl_Position = vec4( pos, 1.0 );
}