import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default class GLTFResolver {

    loader: GLTFLoader;

    public constructor() {
        this.loader = new GLTFLoader();
    }

    public support(): string[] {
        return ['gltf', 'glb'];
    }

    /**
     * 加载GLTF资源
     * @param res 资源元数据
     */
    public resolve(res: { url: string }): Promise<GLTF> {
        return new Promise(resolve => {
            this.loader.load(res.url, resolve);
        });
    }

}
