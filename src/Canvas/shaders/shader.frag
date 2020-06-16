// fragment shader ( フラグメントシェーダー、ピクセルシェーダー )
// このファイルに各ピクセルごとの処理を記述します


varying vec2 vUv;

uniform float uAspect;
uniform float uTime;
uniform vec2  uMouse;// マウス座標

void main() {
  vec2 uv = vec2( vUv.x * uAspect, vUv.y );
  vec2 center = vec2( uMouse.x * uAspect, uMouse.y );// アスペクト補正したマウス座標
  float radius = 0.05 + sin( uTime ) * 0.025;
  float lightness = radius / length( uv - center );
  // lightness = clamp( lightness, 0.0, 1.0 );
  vec4 color = vec4( vec3( lightness ), 1.0 );
  color *= vec4( 0.2, 1.0, 0.5, 1.0 );

  gl_FragColor = color;
}