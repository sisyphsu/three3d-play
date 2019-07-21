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

        // this.scale.setScalar(2);
        // this.rotation.y = Math.PI * -0.25;

        // 地板形状，直接采用平面
        let floorGeometry = new PlaneBufferGeometry(this.width, this.height, 100, 100);
        floorGeometry.rotateX(-Math.PI / 2);

        let groundTexture = grassRes.get();
        groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
        groundTexture.repeat.set(25, 25);
        groundTexture.anisotropy = 16;

        let groundMaterial = new MeshLambertMaterial({map: groundTexture});


        // super(floodrGeometry, groundMaterial);
        this.geometry = floorGeometry;
        this.material = groundMaterial;

        //
        //
        //
        // let position = floorGeometry.attributes.position;
        // let colors = [];
        // let color = new Color();
        // for (let i = 0, l = position.count; i < l; i++) {
        //     color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        //     colors.push(color.r, color.g, color.b);
        // }
        // floorGeometry.addAttribute('color', new Float32BufferAttribute(colors, 3));
        //
        // let texture = grassRes.get();
        // texture.wrapS = texture.wrapT = RepeatWrapping;
        // texture.repeat.set(25, 25);
        // texture.anisotropy = 16;
        //
        // let mesh = new Mesh(new PlaneBufferGeometry(this.width, this.height), new MeshLambertMaterial({map: texture}));
        // // mesh.rotation.x = -Math.PI / 2;
        // // mesh.position.y = 0;
        // // mesh.receiveShadow = true;
        //
        // this.add(mesh);
    }

}
