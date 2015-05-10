declare var Queue;

class Snake implements ISnake {
    private static INIT_LENGTH: number = 50;
    public static LEFT: number = 1;
    public static RIGHT: number = -1;

    particles: Queue<IParticle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;
    invulnerableTime: number;
    lengthToGrow: number;

    // for now assume surface is a sphere centered at origin
    surface: THREE.Sphere;
    scene: THREE.Scene;

    constructor(headPos: THREE.Vector3,
        dir: THREE.Vector3, sphere: THREE.Sphere, scene: THREE.Scene) {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();

        this.surface = sphere;
        this.scene = scene;

        this.invulnerableTime = 0;
        this.lengthToGrow = 0;

        for (var i = 0; i < Snake.INIT_LENGTH; i++) {
            this.growHead();
        }
    }

    public getLength(): number {
        return this.particles.getLength();
    }

    public makeInvulnerable(time: number) {
        this.invulnerableTime = time;
    }

    public isInvulnerable(): boolean {
        return this.invulnerableTime > 0;
    }

    public shorten(length: number): void {
        for (let i = 0; i < length; i++) {
            this.chopTail();
        }
    }

    public growHead() {
        var head: Particle;
        var deltaT = 1 / 50.0;

        // update head position
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);

        // update head
        head = new Particle(this.headPosition.clone());
        this.particles.enqueue(head);

        // update direction
        var normal: THREE.Vector3 = this.headPosition.clone().normalize();
        var normDir = normal.clone().multiplyScalar(this.direction.dot(normal));
        this.direction.sub(normDir).normalize();

        // add to scene
        this.scene.add(head.sphere);
    }

    public chopTail() {
        var tailParticle = this.particles.dequeue();

        this.scene.remove(tailParticle.sphere);
    }

    // the input leftOrRight is either -1 or 1
    public turn(leftOrRight: number) {
        var rotationAngle = Math.PI / 60;
        this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), leftOrRight * rotationAngle);
    }

    public moveForward() {
        this.growHead();

        // grow a certain length
        if (this.lengthToGrow <= 0) {
            this.chopTail();
        }

        this.lengthToGrow--;

        this.invulnerableTime = (this.invulnerableTime > 0) ? this.invulnerableTime - 1 : 0;
    }

    private _checkInvariants() {
    }

}
