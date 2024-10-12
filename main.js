import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('cool_room.png');
scene.background = spaceTexture;


// Avatar

const jeffTexture = new THREE.TextureLoader().load('crazy.png');
const torgiirTexture = new THREE.TextureLoader().load("fucker.png")


const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

const torgiir = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 2), new THREE.MeshBasicMaterial({ map: torgiirTexture }));
scene.add(jeff, torgiir);

// Moon

const moonTexture = new THREE.TextureLoader().load('killer.png');

const moon = new THREE.Mesh(
  new THREE.BoxGeometry( 5, 3, 5, 16 ),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

// Guy 1
// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
let mixer;
let guy
loader.load(
	// resource URL
	'Adventurer.glb',
	// called when the resource is loaded

	function ( gltf ) {
    gltf.scene.position.z = 30;
    const model = gltf.scene
		scene.add( model );
    guy = model

		gltf.animations; // Array<THREE.AnimationClip>

		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

    mixer = new THREE.AnimationMixer(model)
    const clips = gltf.animations
    const clip = THREE.AnimationClip.findByName(clips, 'CharacterArmature|Death');

    const action = mixer.clipAction(clip);
    action.play();

	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( error );

	}
);

// Guy 2¨


// Load a glTF resource
let guy2
let mixer2
loader.load(
	// resource URL
	'Man.glb',
	// called when the resource is loaded

	function ( gltf ) {
    gltf.scene.position.z = 20;
    gltf.scene.position.x = -10;
    gltf.scene.position.y = -5;
    const model = gltf.scene
		scene.add( model );

		gltf.animations; // Array<THREE.AnimationClip>

		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

    mixer2 = new THREE.AnimationMixer(model)
    const clips = gltf.animations
    const clip = THREE.AnimationClip.findByName(clips, 'HumanArmature|Man_Death');

    const action = mixer2.clipAction(clip);
    action.play();

	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( error );

	}
);
// Load a glTF resource
let guy3
let mixer3
loader.load(
	// resource URL
	'gnome.glb',
	// called when the resource is loaded

	function ( gltf ) {
    gltf.scene.position.z = 20;
    gltf.scene.position.x = -10;
    gltf.scene.position.y = -5;
    const model = gltf.scene
		scene.add( model );

		gltf.animations; // Array<THREE.AnimationClip>

		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

    console.log(gltf.animations)
    mixer3 = new THREE.AnimationMixer(model)
    const clips = gltf.animations
    const clip = THREE.AnimationClip.findByName(clips, 'CharacterArmature|Slash');

    const action = mixer3.clipAction(clip);
    action.play();

	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( error );

	}
);


moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

torgiir.position.z = 1;
torgiir.position.x = 4



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.y += 0.01;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  torgiir.rotation.y += .01
  torgiir.rotation.x += .01
  torgiir.rotation.z += .02

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

const clock = new THREE.Clock();
const clock2 = new THREE.Clock();
const clock3 = new THREE.Clock();


function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  // controls.update();
if(mixer){
  mixer.update(clock.getDelta())
}
if(mixer2){
  mixer2.update(clock2.getDelta())
}
if(mixer3){
  mixer3.update(clock3.getDelta())
}

  renderer.render(scene, camera);
}

animate();
