import {
    Mesh,
    MeshLambertMaterial,
    PlaneBufferGeometry,
    RepeatWrapping
} from 'three/src/Three';
import grasslight from './grasslight.jpg';
import loader from '../../loader/Loader'

let grassRes = loader.loadTexture(grasslight);

/**
 * 渲染地板
 */
export default class Floor extends Mesh {

    width = 20000;
    height = 20000;

    constructor() {
        super();

        this.scale.setScalar(0.01);

        // 地板形状，直接采用平面
        let floorGeometry = new PlaneBufferGeometry(this.width, this.height, 100, 100);
        floorGeometry.rotateX(-Math.PI / 2);

        let groundTexture = grassRes.get();
        groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
        groundTexture.repeat.set(25, 25);
        groundTexture.anisotropy = 16;

        let groundMaterial = new MeshLambertMaterial({map: groundTexture});

        this.geometry = floorGeometry;
        this.material = groundMaterial;
        this.position.y = 0;
    }

}
