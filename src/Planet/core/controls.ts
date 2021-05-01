import { OrbitControls } from "three-orbitcontrols-ts";
import { Camera } from 'three';

function controls(camera: Camera, domElem: HTMLElement): OrbitControls {
    const controls = new OrbitControls(camera, domElem);
    controls.enableDamping = true;
    controls.dampingFactor = 0.8;
    controls.rotateSpeed = 0.3;
    return controls;
}

export default controls;