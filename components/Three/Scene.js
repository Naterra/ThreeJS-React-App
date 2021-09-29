import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {addSceneEventListeners, removeSceneEventListeners} from './utils/sceneEvents';


export default function Scene(props){
    const mountRef = useRef(null);

    useEffect(()=>{
        let scene = new THREE.Scene();
        // scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );


        const loader = new THREE.CubeTextureLoader();
        const bgTexture = loader.load([
            'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
            'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
            'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
            'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
            'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
            'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
        ]);
        scene.background = bgTexture;

        // const aspectRatio = window.innerWidth / window.innerHeight; //position camera to the scene center
        let camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 50 );
        // camera.position.z = 1;
        camera.position.set( 5, 1.6, 0 );
        // camera.updateMatrixWorld();

        let renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( ( time )=>{
            // console.log('camera', camera);
            // cube.rotation.x = time / 2000;
            // cube.rotation.y = time / 1000;
            renderer.render( scene, camera );
        });

        // use ref as a mount point of the Three.js scene
        mountRef.current.appendChild( renderer.domElement );

        console.log('renderer', renderer);
        let geometry = new THREE.BoxGeometry( 10, 10, 10 );
        let material = new THREE.MeshNormalMaterial({
            // wireframe: true
        });
        let cube = new THREE.Mesh( geometry, material );

        // Add controls, targeting the same DOM element.
        // Rotate element, Zoom in/out
        let controls = new OrbitControls(camera, mountRef.current);
        controls.target.set(0, 0, 0);
        controls.rotateSpeed = 0.5;
        controls.update();

        scene.add( cube );








        addSceneEventListeners(renderer, camera, scene,{
            onMouseDown:props.onMouseDown
        });

        return function cleanup(){
            removeSceneEventListeners(renderer, camera);
        }
    },[]);






    return( <div ref={mountRef} />)
        // <div ref={element => this.threeRootElement = element} />
}
