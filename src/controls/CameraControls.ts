import {Camera, Euler, Vector2, Vector3} from "three";

export default class CameraControls {

    private camera: Camera;
    private keyStats = new Map<string, number>();

    private rotation = new Vector2(); // 镜头旋转角度
    private spinning = new Vector2(); // 旋转向量
    private velocity = new Vector3(); // 移动向量

    private forward = new Vector3();
    private sideway = new Vector3();

    constructor(dom: HTMLElement, camera: Camera) {
        this.camera = camera;

        dom.addEventListener('keydown', e => this.keyStats[e.key] = 1);
        dom.addEventListener('keyup', e => this.keyStats[e.key] = 0);
        dom.addEventListener('whell', e => {

        });
    }

    /**
     * 更新镜头信息
     * @param timeElapsed 两帧时间间隔
     */
    update(timeElapsed: number) {
        // 根据方向键状态计算xy轴的旋转角度
        this.spinning.x += this.keyStats['ArrayUp'];
        this.spinning.x -= this.keyStats['ArrayDown'];
        this.spinning.y += this.keyStats['ArrayLeft'];
        this.spinning.y -= this.keyStats['ArrayRight'];

        // 根据视角垂直倾斜度计算移动方向，需要考虑倾角
        let sinY = Math.sin(this.rotation.y);
        let cosY = Math.cos(this.rotation.y);
        this.forward.set(sinY, 0, cosY);
        this.sideway.set(cosY, 0, -sinY);
        this.forward.multiplyScalar((this.keyStats['s'] - this.keyStats['w']) * 0.1);
        this.sideway.multiplyScalar((this.keyStats['d'] - this.keyStats['a']) * 0.1);

        // 将forward与sideway的移动数值合并，两者应该是互相独立的
        let combined = this.forward.add(this.sideway);
        if (Math.abs(combined.x) >= Math.abs(this.velocity.x))
            this.velocity.x = combined.x;
        if (Math.abs(combined.z) >= Math.abs(this.velocity.z))
            this.velocity.z = combined.z;
        if (Math.abs(combined.y) >= Math.abs(this.velocity.y))
            this.velocity.y = combined.y;

        // 支持跳跃，更新垂直方向速率
        this.velocity.y += this.keyStats[' '] ? 0.7 : 0;

        // 更新镜头角度
        let euler = new Euler(this.rotation.y, this.rotation.x, 0, 'YXZ');
        this.camera.quaternion.setFromEuler(euler);
        // this.camera.position.copy(this.);
    }

}
