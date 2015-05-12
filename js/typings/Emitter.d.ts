interface Emitter {
    _maxParticleCount: number;
    _particlesPerSecond: number;
    _initializer: any;
    _updater: any;
    _cloth: boolean;
    _width: number;
    _height: number;
    _attributeInformation: any;

    _particles: THREE.BufferGeometry;
    _initialized: Array<boolean>;

    _sorting: boolean;
    _distances: Array<number>;

    restart(): void;
    update(delta_t: number): void;
    enableSorting(val: any): void;
    getDrawableParticles(): any;
    sortParticles(): void;
    getSpawnable(toAdd: any): Array<any>;
} declare var Emitter: {
    new (value?: any): Emitter;
}
