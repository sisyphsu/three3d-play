/**
 *
 */
export default class ImageResolver {

    constructor() {
    }

    public support(): string[] {
        return ['png', 'jpg', 'jpeg', 'image'];
    }

    /**
     * 加载图片资源, 将它放入一个新的图片元素中
     * @param item
     */
    public resolve(item: { url: string }): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.src = item.url;
        });
    }

}
