const getMousePosition = ( e, renderer ) => {
    const {top, left, width, height} = renderer.domElement.getBoundingClientRect();

    return {
        x : -1 + 2 * (e.clientX - left) / width, // eslint-disable-line
        y : 1 - 2 * (e.clientY - top) / height // eslint-disable-line
    }
};





const onClickCanvas=(e)=>{console.log('>onClickCanvas', e);}

const onMouseDown=(e, renderer)=>{
    const mPos = getMousePosition(e, renderer);
    console.log('>onMouseDown', {mPos});
}

const onMouseUp=(e)=>{ console.log('>onMouseUp', e);}


const onMouseMove=(e)=>{
    // console.log('>onMouseMove', e);
}
const onWheel=(e)=>{
    // console.log('>onWheel', e);
}
const onContextMenu=(e)=>{ console.log('>onContextMenu', e);}

const resizeCanvas =(camera) =>{
    const w  = window.innerWidth;
    const h  = window.innerHeight;

    camera.aspect = w/h; //position camera to the new scene center
    renderer.setSize(w, h);//update canvas dimensions
}



export const addSceneEventListeners=(renderer, camera)=>{
    renderer.domElement.addEventListener('resize', e =>resizeCanvas(camera));
    renderer.domElement.addEventListener('click', onClickCanvas);
    renderer.domElement.addEventListener('mousedown', e=>onMouseDown(e, renderer));
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('contextmenu', onContextMenu);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('wheel', onWheel);//zoom in/out
}

export const removeSceneEventListeners=(renderer)=>{
    renderer.domElement.removeEventListener('resize', resizeCanvas);
    renderer.domElement.removeEventListener('click', onClickCanvas);
    renderer.domElement.removeEventListener('mousedown', onMouseDown);
    renderer.domElement.removeEventListener('mouseup', onMouseUp);
    renderer.domElement.removeEventListener('contextmenu', onContextMenu);
}
