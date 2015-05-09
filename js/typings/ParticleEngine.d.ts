/// <reference path="../../typings/tsd.d.ts"/>

declare var ParticleEngine: ParticleEngine;

interface ParticleEngine {
    _emitters: Array<Emitter>;
    _meshes: Array<Mesh>;
    _animations: Array<any>;
    _prev_t: any;
    _cur_t: any;
    _isRunning: boolean;

    start();
    stop();

    getDrawableParticles(i: number): any;
    addEmitter(emitter: Emitter);
    removeEmitters();
    removeAnimations();
}

interface Mesh extends THREE.Mesh {
    morphTargetInfluences: Array<number>;
}

interface MorphedMesh {
    vertices: Array<any>;
    faces: Array<any>;
    scale: THREE.Vector3;
    position: THREE.Vector3;
}
