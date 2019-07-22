import {Object3D} from 'three'
import loader from '../../loader/Loader'

import tower from './tower.glb';

let gltfRes = loader.loadGLTF(tower);

export default class Tower extends Object3D {

    constructor() {
        super();

        this.scale.setScalar(1);
        this.position.z = -10;
        this.position.x = -10;
        this.position.y = -0.75;

        const tower = gltfRes.get();
        this.add(tower.scene);
    }

}
