import {AnimationMixer, Object3D, SkeletonHelper} from 'three'
import loader from '../../loader/Loader'

import robot from './robot.glb';

let robotRes = loader.loadGLTF(robot);

export default class Robot extends Object3D {

    private mixer: AnimationMixer;

    constructor() {
        super();

        this.scale.setScalar(1);
        this.position.z = 0;
        this.position.x = 0;
        this.position.y = 0;

        const res = robotRes.get();
        let model = res.scene;
        this.add(model);

        let skeleton = new SkeletonHelper(model);
        skeleton.visible = false;
        this.add(skeleton);

        this.mixer = new AnimationMixer(model);
        let animations = res.animations;
        let idleAction = this.mixer.clipAction(animations[0]);
        let walkAction = this.mixer.clipAction(animations[3]);
        let runAction = this.mixer.clipAction(animations[1]);

        runAction.enabled = true;
        runAction.setEffectiveTimeScale(1);
        runAction.setEffectiveWeight(1);
        runAction.play();

        idleAction.enabled = true;
        idleAction.setEffectiveWeight(0.1);
        idleAction.setEffectiveTimeScale(1);
        idleAction.play();

        walkAction.enabled = false;
    }

    update(delta: number) {
        this.mixer.update(delta);
    }

}
