import * as THREE from 'three';
import { view } from './editor.js';

function main() {
  const canvas = document.getElementById('shader-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

  const camera = new THREE.OrthographicCamera(
    -1, // left
    1, // right
    1, // top
    -1, // bottom
    -1, // near,
    1, // far
  );

  let fragmentShader = view.state.doc.toString();

  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
  };

  const scene = new THREE.Scene();
  const plane = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms
  });

  scene.add(new THREE.Mesh(plane, material));

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    resizeRendererToDisplaySize(renderer);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
