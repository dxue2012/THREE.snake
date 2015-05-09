declare var Queue;

class Snake implements ISnake {
    particles: Queue<IParticle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;

    // suppose surface is a sphere, and surface is centered at origin
    surface: THREE.Sphere;
    scene: THREE.Scene;

    constructor(headPos: THREE.Vector3,
        dir: THREE.Vector3, sphere: THREE.Sphere, scene: THREE.Scene) {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();

        this.surface = sphere;
        this.scene = scene;

        for (var i = 0; i < 30; i++) {
            this.growHead();
        }
    }

    public getLength(): number {
        return this.particles.getLength();
    }

    public growHead() {
        var head: Particle;
        var deltaT = 1 / 100.0;

        // update head position
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);

        // update head
        head = new Particle(this.headPosition);
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

    public turn(input: String) {
        var LEFT = "A";
        var RIGHT = "D";
        var rotationAngle = Math.PI / 60;

        if (input === LEFT) {
            this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), rotationAngle);
        }
        else if (input === RIGHT) {
            this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), -rotationAngle);
        }
    }

    public moveForward() {
        this.chopTail();
        this.growHead();
    }

    private _checkInvariants() {
    }

}