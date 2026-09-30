var l=Object.defineProperty;var o=(n,e)=>l(n,"name",{value:e,configurable:!0});import*as a from"three";const s=`
  out vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,c=`
  precision highp float;
  precision highp sampler3D;
  uniform sampler3D uData;
  uniform sampler2D uTF;
  uniform vec3 uCam;        // camera in object space
  uniform vec3 uDims;       // texels
  uniform vec3 uScale;      // object -> world scale
  uniform vec3 uClipMin, uClipMax;
  uniform int uMode;
  uniform float uStep;      // step length in texels
  uniform sampler2D uTerrain;  // ground height / uTerrainMax
  uniform float uTerrainMax;   // km
  uniform float uTerrainScale; // terrain relief / radar exaggeration: stop at the ground as drawn
  uniform vec2 uZRange;        // grid z0, z1 in km
  uniform float uUseTerrain;
  uniform float uMaxSign;
  // CT-style slab: only samples within uSlabHalf km of the plane through uSlabC
  // (km, true heights) with unit normal uSlabN are drawn.
  uniform float uSlabOn;
  uniform vec3 uSlabN, uSlabC;
  uniform float uSlabHalf;
  uniform vec3 uGridMin, uGridSize;   // km
  uniform vec4 uSlabHP;               // xyz: keep only the side dot(p - c, xyz) >= 0; w: on   // +1: max mode prefers high values, -1: low, 0: far from 0 m/s
  in vec3 vPos;
  out vec4 outColor;

  vec2 hitBox(vec3 o, vec3 d, vec3 bmin, vec3 bmax) {
    vec3 inv = 1.0 / d;
    vec3 t0 = (bmin - o) * inv, t1 = (bmax - o) * inv;
    vec3 tn = min(t0, t1), tf = max(t0, t1);
    return vec2(max(max(tn.x, tn.y), tn.z), min(min(tf.x, tf.y), tf.z));
  }

  float code(vec3 uvw) { return texture(uData, uvw).r; }
  vec4 tf(float c) { return texture(uTF, vec2(c * (255.0 / 256.0) + 0.5 / 256.0, 0.5)); }

  vec3 normalAt(vec3 uvw) {
    vec3 h = 1.0 / uDims;
    vec3 g = vec3(
      tf(code(uvw + vec3(h.x, 0, 0))).a - tf(code(uvw - vec3(h.x, 0, 0))).a,
      tf(code(uvw + vec3(0, h.y, 0))).a - tf(code(uvw - vec3(0, h.y, 0))).a,
      tf(code(uvw + vec3(0, 0, h.z))).a - tf(code(uvw - vec3(0, 0, h.z))).a) / (2.0 * h);
    g = g / uScale;                        // object-space gradient -> world
    float l = length(g);
    return l > 1e-6 ? -g / l : vec3(0, 0, 1);
  }

  void main() {
    vec3 o = uCam;
    vec3 d = normalize(vPos - uCam);
    vec2 t = hitBox(o, d, uClipMin - 0.5, uClipMax - 0.5);
    if (t.x >= t.y) discard;
    t.x = max(t.x, 0.0);

    float dt = uStep / length(d * uDims); // object-space length of one step
    vec3 viewW = normalize(d * uScale);
    vec4 acc = vec4(0.0);
    float best = -1.0;
    vec4 bestC = vec4(0.0);

    for (int i = 0; i < 4096; i++) {
      float tt = t.x + (float(i) + 0.5) * dt;
      if (tt > t.y) break;
      vec3 uvw = o + d * tt + 0.5;
      if (uSlabOn > 0.5) {
        vec3 pk = uGridMin + uvw * uGridSize - uSlabC;
        if (abs(dot(pk, uSlabN)) > uSlabHalf) continue;
        if (uSlabHP.w > 0.5 && dot(pk, uSlabHP.xyz) < 0.0) continue;   // radial slice: one side of the radar
      }
      // Ground is opaque: nothing beyond it along this ray can be seen.
      if (uUseTerrain > 0.5 && mix(uZRange.x, uZRange.y, uvw.z) < texture(uTerrain, uvw.xy).r * uTerrainMax * uTerrainScale) break;
      float c = code(uvw);
      if (c < 0.5 / 255.0) continue;       // no data
      vec4 s = tf(c);
      if (s.a <= 0.0) continue;

      if (uMode == 0) {
        float a = 1.0 - pow(1.0 - s.a, uStep);
        acc.rgb += (1.0 - acc.a) * a * s.rgb;
        acc.a += (1.0 - acc.a) * a;
        if (acc.a > 0.97) break;
      } else if (uMode == 1) {
        // Colour by the strongest value a little way inside the surface, so a
        // surface drawn at the threshold still shows where the cores are.
        float inner = c;
        for (int k = 1; k <= 10; k++) {
          vec3 q = uvw + d * dt * float(k) * 2.0;
          if (any(lessThan(q, uClipMin)) || any(greaterThan(q, uClipMax))) break;
          float ck = code(q);
          if (ck < 0.5 / 255.0) continue;
          if (uMaxSign > 0.0) inner = max(inner, ck);
          else if (uMaxSign < 0.0) inner = min(inner, ck);
          else if (abs(ck - 128.0 / 255.0) > abs(inner - 128.0 / 255.0)) inner = ck;
        }
        vec3 n = normalAt(uvw);
        float lam = abs(dot(n, -viewW));
        float lit = 0.35 + 0.65 * lam;
        float rim = pow(1.0 - lam, 3.0) * 0.25;
        acc = vec4(tf(inner).rgb * lit + rim, 1.0);
        break;
      } else {
        float key = uMaxSign > 0.0 ? c : uMaxSign < 0.0 ? 1.0 - c : abs(c - 128.0 / 255.0);
        if (key > best) { best = key; bestC = s; }
      }
    }
    if (uMode == 2) {
      if (best < 0.0) discard;
      acc = vec4(bestC.rgb, 0.9);
    }
    if (acc.a <= 0.0) discard;
    outColor = vec4(acc.rgb / max(acc.a, 1e-4), acc.a);
  }`;class f{static{o(this,"RadarVolume")}constructor(e){this.grid=e;const{nx:t,ny:r,nz:i}=e;this.texture=new a.Data3DTexture(new Uint8Array(t*r*i),t,r,i),this.texture.format=a.RedFormat,this.texture.type=a.UnsignedByteType,this.texture.unpackAlignment=1,this.setFilter(!0),this.tfTexture=new a.DataTexture(new Uint8Array(256*4),256,1),this.tfTexture.magFilter=a.NearestFilter,this.tfTexture.minFilter=a.NearestFilter,this.tfTexture.needsUpdate=!0,this.material=new a.ShaderMaterial({glslVersion:a.GLSL3,vertexShader:s,fragmentShader:c,side:a.BackSide,transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uData:{value:this.texture},uTF:{value:this.tfTexture},uCam:{value:new a.Vector3},uDims:{value:new a.Vector3(t,r,i)},uScale:{value:new a.Vector3(1,1,1)},uClipMin:{value:new a.Vector3(0,0,0)},uClipMax:{value:new a.Vector3(1,1,1)},uMode:{value:0},uStep:{value:.6},uMaxSign:{value:1},uTerrain:{value:null},uTerrainMax:{value:1},uTerrainScale:{value:1},uZRange:{value:new a.Vector2(e.z0,e.z1)},uUseTerrain:{value:0},uSlabOn:{value:0},uSlabN:{value:new a.Vector3(1,0,0)},uSlabC:{value:new a.Vector3},uSlabHalf:{value:1},uSlabHP:{value:new a.Vector4(0,0,0,0)},uGridMin:{value:new a.Vector3(e.x0,e.y0,e.z0)},uGridSize:{value:new a.Vector3(e.x1-e.x0,e.y1-e.y0,e.z1-e.z0)}}}),this.mesh=new a.Mesh(new a.BoxGeometry(1,1,1),this.material),this.mesh.renderOrder=10,this.setExaggeration(5)}setFilter(e){const t=e?a.LinearFilter:a.NearestFilter;this.texture.minFilter=t,this.texture.magFilter=t,this.texture.needsUpdate=!0}setExaggeration(e){const t=this.grid,r=t.x1-t.x0,i=t.y1-t.y0,u=(t.z1-t.z0)*e;this.mesh.scale.set(r,i,u),this.mesh.position.set((t.x0+t.x1)/2,(t.y0+t.y1)/2,t.z0*e+u/2),this.material.uniforms.uScale.value.set(r,i,u),this.vex=e}setTerrain(e,t,r=1){const i=this.material.uniforms;i.uTerrainScale.value=r,i.uTerrain.value=e?e.texture:null,i.uTerrainMax.value=e?e.maxKm:1,i.uUseTerrain.value=e&&t?1:0}setSlab(e){const t=this.material.uniforms;t.uSlabOn.value=e?1:0,e&&(t.uSlabN.value.set(...e.n),t.uSlabC.value.set(...e.c),t.uSlabHalf.value=e.halfKm,t.uSlabHP.value.set(...e.side||[0,0,0],e.side?1:0))}setData(e){this.texture.image.data=e,this.texture.needsUpdate=!0}setTransfer(e){this.tfTexture.image.data=e,this.tfTexture.needsUpdate=!0}update(e){this.mesh.updateMatrixWorld();const t=this.mesh.worldToLocal(e.position.clone());this.material.uniforms.uCam.value.copy(t)}}export{f as RadarVolume};
