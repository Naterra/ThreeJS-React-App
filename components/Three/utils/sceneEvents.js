import * as THREE from 'three';

const getMousePosition = ( e, renderer ) => {
    const {top, left, width, height} = renderer.domElement.getBoundingClientRect();

    return {
        x : -1 + 2 * (e.clientX - left) / width, // eslint-disable-line
        y : 1 - 2 * (e.clientY - top) / height // eslint-disable-line
    }
};


const findIntersections=(e, renderer, camera, scene)=>{
    const mouse =getMousePosition(e, renderer);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( scene.children );
    console.log('>intersects', {camera, intersects});

    const targetDistance = intersects?.[ 0 ]?.distance;
    // camera.focusAt( targetDistance );
}


const onClickCanvas=(e)=>{console.log('>onClickCanvas', e);}

const onMouseDown=(e, renderer, camera, scene, customOnMouseDown)=>{
    const position = getMousePosition(e, renderer);
    console.log('>onMouseDown', {position});

    const int =findIntersections(e, renderer, camera, scene);

    if(customOnMouseDown) customOnMouseDown(position);
}

const onMouseUp=(e)=>{ console.log('>onMouseUp', e);}


const onMouseMove=(e)=>{
    // console.log('>onMouseMove', e);
}
const onWheel=(e)=>{
    // console.log('>onWheel', e);
}
const onContextMenu=(e)=>{ console.log('>onContextMenu', e);}

const onWindowResize =(renderer, camera) =>{
    console.log('>onWindowResize');


    const w  = window.innerWidth;
    const h  = window.innerHeight;

    camera.aspect = w/h; //position camera to the new scene center
    camera.updateProjectionMatrix(); //keep scene objects in correct shape without getting distortion
    renderer.setSize(w, h);//update canvas dimensions

    // const canvas = renderer.domElement;
    // const width = canvas.clientWidth;
    // const height = canvas.clientHeight;

    // const needResize = canvas.width !== width || canvas.height !== height;
    // if (needResize) {
    //     renderer.setSize(width, height, false);
    // }


}



export const addSceneEventListeners=(renderer, camera, scene, customEvents)=>{
    window.addEventListener('resize', e =>onWindowResize(renderer, camera));
    renderer.domElement.addEventListener('click', onClickCanvas);
    renderer.domElement.addEventListener('mousedown', e=>onMouseDown(e, renderer, camera, scene, customEvents['onMouseDown']));
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('contextmenu', onContextMenu);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('wheel', onWheel);//zoom in/out
}



export const removeSceneEventListeners=(renderer)=>{
    window.removeEventListener('resize', onWindowResize);
    renderer.domElement.removeEventListener('click', onClickCanvas);
    renderer.domElement.removeEventListener('mousedown', onMouseDown);
    renderer.domElement.removeEventListener('mouseup', onMouseUp);
    renderer.domElement.removeEventListener('contextmenu', onContextMenu);
}
