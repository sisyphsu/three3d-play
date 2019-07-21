import {Texture, TextureLoader} from 'three';

export default class TextureResolver {

    type: string;
    renderer: any;
    loader: TextureLoader;

    constructor(renderer = null) {
        this.type = 'texture';
        this.renderer = renderer;
        this.loader = new TextureLoader();
    }

    public support(): string[] {
        return ['texture'];
    }

    public resolve(item: { url: string }): Promise<Texture> {
        return new Promise(resolve => {
            this.loader.load(item.url, texture => {
                if (this.renderer) {
                    this.renderer.setTexture2D(texture, 0);
                }
                resolve(texture);
            });
        });
    }

}
