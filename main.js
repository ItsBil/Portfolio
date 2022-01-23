import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

//Background
const bg = new THREE.TextureLoader().load('back.jpg');
const bilalTexture = new THREE.TextureLoader().load('BilalCropped.png');
scene.background = bg;

//Geometries
//Donut
const donut = new THREE.Mesh(
  new THREE.TorusGeometry(10, 3, 16, 100), 
  new THREE.MeshStandardMaterial({color: 0xffffff})
  );
  donut.position.set(13,2,-15);
//Image
const bilal = new THREE.Mesh(
  new THREE.BoxGeometry(12,14,0),
  new THREE.MeshBasicMaterial( {map: bilalTexture})
  );
  bilal.material.transparent = true;
  bilal.material.opacity = 1;
  bilal.position.set(13,2,-15);



//Lights
//Point light
const light = new THREE.PointLight(0xffffff);
//Ambient light
const ambientlight = new THREE.AmbientLight(0xffffff);

//Helpers
const help = new THREE.PointLightHelper(light);
const grid = new THREE.GridHelper(200,50);
const controls = new OrbitControls(camera, renderer.domElement);
light.position.set(5,5,5);

//Add to Scene
scene.add(ambientlight,donut, controls);

function animate() {
  requestAnimationFrame( animate );
  donut.rotation.x += 0.01;
  donut.rotation.y += 0.005;
  donut.rotation.z += 0.01;
  renderer.render(scene, camera);
}

function scroll() {
  const top = document.body.getBoundingClientRect().top;
  const scroll = window.scrollY;
  camera.position.z = top * -0.01;
  camera.position.x = top * -0.0002;
  camera.position.y = top * -0.0002;
  document.getElementById("counter").innerHTML = scroll;
  if (scroll < 700) {
    document.getElementById("bilal").className = "animate__animated animate__fadeIn";
  }
  else
  {
    document.getElementById("bilal").className = "animate__animated animate__fadeOut";
  }
}

function addStars() {
//Star
const star = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 24, 24),
  new THREE.MeshStandardMaterial({color: 0xffffff})
);
const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
star.position.set(x,y,z);
scene.add(star);
}

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
}

document.body.onscroll = scroll;
Array(200).fill().forEach(addStars);
animate();



