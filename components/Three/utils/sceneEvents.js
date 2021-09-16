const getMousePosition = (refToUpdate, e) => {
    const {top, left, width, height} = renderer.domElement.getBoundingClientRect();

    refToUpdate.current.x = -1 + 2 * (e.clientX - left) / width; // eslint-disable-line
    refToUpdate.current.y = 1 - 2 * (e.clientY - top) / height; // eslint-disable-line
};


function resizeCanvas() {
    const w  = window.innerWidth;
    const h  = window.innerHeight;

    camera.aspect = w/h; //position camera to the new scene center
    renderer.setSize(w, h);//update canvas dimensions
}


const onClickCanvas=(e)=>{console.log('>onClickCanvas', e);}
const onMouseDown=(e)=>{ console.log('>onMouseDown', e);}
const onMouseUp=(e)=>{ console.log('>onMouseUp', e);}
const onContextMenu=(e)=>{ console.log('>onContextMenu', e);}
const onMouseMove=(e)=>{ console.log('>onMouseMove', e);}
const onWheel=(e)=>{ console.log('>onWheel', e);}


export const addSceneEventListeners=(renderer)=>{
    renderer.domElement.addEventListener('resize', resizeCanvas);
    renderer.domElement.addEventListener('click', onClickCanvas);
    renderer.domElement.addEventListener('mousedown', onMouseDown);
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
