import {Object3D} from 'three'
import loader from '../../loader/Loader'

import tower from './tower.glb';

let gltfRes = loader.loadGLTF(tower);

export default class Tower extends Object3D {

    constructor() {
        super();

        this.scale.setScalar(2);
        this.position.z = -30;
        this.position.x = -30;
        // this.rotation.y = Math.PI * -0.25;

        const tower = gltfRes.get();
        this.add(tower.scene);
    }

}
