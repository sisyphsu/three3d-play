import {Texture} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import GLTFResolver from "./resolver/GLTFResolver";
import ImageResolver from "./resolver/ImageResolver";
import TextureResolver from "./resolver/TextureResolver";

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
 * 资源模型
 */
class Resource<T> {

    t: T;
    promise: Promise<T>;

    constructor(promise: Promise<T>) {
        promise.then(t => {
            this.t = t;
        });
        this.promise = promise;
    }

    get(): T {
        return this.t;
    }
}

/**
 * 资源加载器
 */
class Loader {

    private readonly resolvers = new Array<Resolver<any>>();
    private readonly resolverIdx = new Map<String, Resolver<any>>();
    private readonly resources = new Array<Resource<any>>();
    private readonly resourceMap = new Map<String, Resource<any>>();

    constructor() {
        this.resolvers.push(
            new GLTFResolver(),
            new ImageResolver(),
            new TextureResolver(),
        );
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
    public loadGLTF(url: string): Resource<GLTF> {
        return this.load(url, 'gltf');
    }

    /**
     * 加载图片资源
     * @param url 图片路径
     */
    public loadImage(url: string): Resource<HTMLImageElement> {
        return this.load(url, 'image');
    }

    /**
     * 加载素材资源
     * @param url 素材路径
     */
    public loadTexture(url: string): Resource<Texture> {
        return this.load(url, 'texture');
    }

    /**
     * 加载资源
     * @param url 资源地址
     * @param type 资源类型
     */
    public load(url: string, type?: string): Resource<any> {
        if (!type) {
            let parts = url.split('.');
            type = parts[parts.length - 1];
        }
        let resolver = this.resolverIdx[type];
        if (!resolver) {
            throw 'unsupport type: ' + type;
        }
        let res: Resource<any> = this.resourceMap[url];
        if (res)
            return res;

        res = new Resource(resolver.resolve({url}));
        this.resources.push(res);
        this.resourceMap[url] = res;
        return res;
    }

    /**
     * 资源全部加载完成后的回调函数
     * @param succ
     * @param fail
     */
    public done(succ: () => void, fail?: (e: Error) => void) {
        let promises = new Array<Promise<any>>();
        this.resources.forEach(ref => promises.push(ref.promise));
        Promise.all(promises)
            .then(() => succ())
            .catch(reason => fail && fail(reason));
    }

}

export default new Loader();
