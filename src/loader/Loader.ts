import GLTFResolver from "loader/resolver/GLTFResolver";
import ImageResolver from "loader/resolver/ImageResolver";
import TextureResolver from "loader/resolver/TextureResolver";
import {Texture} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

/**
 * 资源解析器
 */
interface Resolver<T> {
    /**
     * 支持的资源类型，支持后缀名定位
     */
    support(): string[]

    /**
     * 异步解析指定资源
     * @param res 资源信息
     */
    resolve(res: { url: string }): Promise<T>
}

/**
 * 资源加载器
 */
class Loader {

    private readonly resolvers = new Array<Resolver<any>>();
    private readonly resolverIdx = new Map<String, Resolver<any>>();
    private readonly promises = new Array<Promise<any>>();
    private readonly promiseMap = new Map<String, Promise<any>>();

    constructor() {
        this.resolvers = [
            new GLTFResolver(),
            new ImageResolver(),
            new TextureResolver(),
        ];
        this.resolverIdx = new Map<String, Resolver<any>>();
        this.resolvers.forEach(resolver => {
            let types = resolver.support();
            types && types.forEach(t => this.resolverIdx[t] = resolver);
        });
    }

    /**
     * 加载gltf资源
     * @param url 模型路径
     */
    public loadGLTF(url: string): Promise<GLTF> {
        return this.load(url, 'gltf');
    }

    /**
     * 加载图片资源
     * @param url 图片路径
     */
    public loadImage(url: string): Promise<HTMLImageElement> {
        return this.load(url, 'image');
    }

    /**
     * 加载素材资源
     * @param url 素材路径
     */
    public loadTexture(url: string): Promise<Texture> {
        return this.load(url, 'texture');
    }

    /**
     * 加载资源
     * @param url 资源地址
     * @param type 资源类型
     */
    public load(url: string, type?: string): Promise<any> {
        if (!type) {
            let parts = url.split('.');
            type = parts[parts.length - 1];
        }
        let resolver = this.resolverIdx.get(type);
        if (!resolver) {
            throw 'unsupport type: ' + type;
        }
        let promise = this.promiseMap[url];
        if (promise)
            return promise;
        promise = resolver.resolve({url});
        this.promises.push(promise);
        this.promiseMap[url] = promise;
        return promise;
    }

    /**
     * 资源全部加载完成后的回调函数
     * @param succ
     * @param fail
     */
    public done(succ: () => void, fail: (e: Error) => void) {
        Promise.all(this.promises)
            .then(() => succ())
            .catch(reason => fail(reason));
    }

}

export default new Loader();
