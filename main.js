import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';

let container, camera, scene, renderer, mesh, effect;
const spheres = [];

//DOM

container = document.createElement( 'div' );
document.body.appendChild( container );

// Camera

camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
camera.position.z = 2;

//Background

const path = './background/';
const format = '.jpg';
const urls = [
				path + 'px' + format, path + 'nx' + format,
				path + 'py' + format, path + 'ny' + format,
				path + 'pz' + format, path + 'nz' + format
			];

const textureCube = new THREE.CubeTextureLoader().load( urls );

scene = new THREE.Scene();
scene.background = textureCube;

// Materials

const geometry = new THREE.SphereGeometry( 0.1, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

//Create a spheres

for ( let i = 0; i < 1000; i ++ ) {

	mesh = new THREE.Mesh( geometry, material );

	  mesh.position.x = Math.random() * 20 - 10;
		mesh.position.y = Math.random() * 20 - 10;
		mesh.position.z = Math.random() * 20 - 10;

		mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

		scene.add( mesh );

		spheres.push( mesh );

}

//Render

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

//Animate

renderer.setAnimationLoop(animate);

function animate() {
  const timer = 0.0001 * Date.now();

  effect.render( scene, camera );

  for ( let i = 0, il = spheres.length; i < il; i ++ ) {

    const sphere = spheres[ i ];

    sphere.position.x = 10 * Math.cos( timer + i );
    sphere.position.y = 10 * Math.sin( timer + i * 1.1 );

  }
}

//Effects

const width = window.innerWidth || 2;
const height = window.innerHeight || 2;

effect = new AnaglyphEffect( renderer );
effect.setSize( width, height );

//Controls 

const controls = new OrbitControls( camera, renderer.domElement ); 

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	effect.setSize( window.innerWidth, window.innerHeight );

}

window.addEventListener( 'resize', onWindowResize );