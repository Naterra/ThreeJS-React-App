import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {addSceneEventListeners, removeSceneEventListeners} from './utils/sceneEvents';


export default function Scene(){
    const mountRef = useRef(null);

    useEffect(()=>{
        let scene = new THREE.Scene();


        const aspectRatio = window.innerWidth / window.innerHeight; //position camera to the scene center
        let camera = new THREE.PerspectiveCamera( 70, aspectRatio, 0.01, 10 );
        camera.position.z = 1;

        let renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( ( time )=>{
            // console.log('camera', camera);
            cube.rotation.x = time / 2000;
            cube.rotation.y = time / 1000;
            renderer.render( scene, camera );
        });

        // use ref as a mount point of the Three.js scene
        mountRef.current.appendChild( renderer.domElement );

        console.log('renderer', renderer);
        let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        let material = new THREE.MeshNormalMaterial({
            wireframe: true
        });
        let cube = new THREE.Mesh( geometry, material );

        // Add controls, targeting the same DOM element.
        //Rotate element, Zoom in/out
        let controls = new OrbitControls(camera, mountRef.current);
        controls.target.set(0, 0, 0);
        controls.rotateSpeed = 0.5;
        controls.update();

        scene.add( cube );








        addSceneEventListeners(renderer);

        return function cleanup(){
            removeSceneEventListeners(renderer, camera);
        }
    },[]);






    return( <div ref={mountRef} />)
        // <div ref={element => this.threeRootElement = element} />
}
