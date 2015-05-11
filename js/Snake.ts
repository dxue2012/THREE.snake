declare var Queue;

class Snake implements ISnake {
    private static INIT_LENGTH: number = 50;
    private static DEFAULT_COLOR: THREE.Color = new THREE.Color(0x0000ff);

    public static LEFT: number = 1;
    public static RIGHT: number = -1;

    particles: Queue<IParticle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;
    invulnerableTime: number;
    lengthToGrow: number;
    color: THREE.Color;
    head: THREE.Mesh;

    // for now assume surface is a sphere centered at origin
    surface: THREE.Sphere;
    scene: THREE.Scene;

    constructor(
        headPos: THREE.Vector3,
        dir: THREE.Vector3,
        // head: THREE.Mesh,
        sphere: THREE.Sphere,
        scene: THREE.Scene,
        color?: THREE.Color) {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();

        this.surface = sphere;
        this.scene = scene;

        this.invulnerableTime = 0;
        this.lengthToGrow = 0;

        this.color = color ? color : Snake.DEFAULT_COLOR;

        var headGeo = new THREE.SphereGeometry(0.05, 8,8);
        var headMat = new THREE.MeshBasicMaterial( {color: this.color.getHex(), wireframe: true} );
        this.head = new THREE.Mesh(headGeo, headMat);
        this.head.position.set(headPos.x, headPos.y, headPos.z);
        this.scene.add(this.head);

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

    public growLength(length: number): void {
        this.lengthToGrow += length;
    }

    public growHead() {
        var headParticle: Particle;
        var deltaT = 1 / 50.0;

        // update head position
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);

        // update head
        headParticle = new Particle(this.headPosition.clone(), this.color);
        this.particles.enqueue(headParticle);

        // update direction
        var normal: THREE.Vector3 = this.headPosition.clone().normalize();
        var normDir = normal.clone().multiplyScalar(this.direction.dot(normal));
        this.direction.sub(normDir).normalize();

        // add to scene
        this.scene.add(headParticle.sphere);

        // update the head mesh
        if (this.isInvulnerable) {
          ;
        }
        else {;}
        this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
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
        } else {
            this.lengthToGrow--;
        }

        this.invulnerableTime = (this.invulnerableTime > 0) ? this.invulnerableTime - 1 : 0;
    }

    private _checkInvariants() {
    }

}
