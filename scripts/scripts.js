/* WebGL-фон */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true,
});
renderer.setSize(innerWidth, innerHeight);
const geo = new THREE.PlaneGeometry(2, 2);
const mat = new THREE.ShaderMaterial({
  uniforms: { time: { value: 0 } },
  vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.);}`,
  fragmentShader: `uniform float time;varying vec2 vUv;void main(){vec2 p=vUv*2.-1.;float t=time*0.2;vec3 col=vec3(0.2,0.3,0.8)+0.5*sin(t+p.xyx*3.14);gl_FragColor=vec4(col,0.9);}`,
});
const plane = new THREE.Mesh(geo, mat);
scene.add(plane);
camera.position.z = 1;
function animate(t) {
  mat.uniforms.time.value = t * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  renderer.setSize(innerWidth, innerHeight);
});
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
gsap.from('.card', {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.gallery',
    start: 'top 70%'
  }
});