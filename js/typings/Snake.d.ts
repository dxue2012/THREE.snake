interface ISnake {
    particles: Queue<IParticle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;
    head: THREE.Mesh;

    invulnerableTime: number;
    speedupTime: number;
    lengthToGrow: number;
    speed: number;

    // its environment
    surface: THREE.Sphere;
    scene: THREE.Scene;

    getLength(): number;
    turn(leftOrRight: number): void;
    moveForward(): void;
    shorten(length: number): void;
    growLength(length: number): void;

    makeInvulnerable(time: number): void;
    isInvulnerable(): boolean;
    isSpeedingup(): boolean;
}
