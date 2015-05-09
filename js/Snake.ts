class Snake implements Snake {
    private particles: Queue<Particle>;
    private direction: THREE.Vector3;
    private headPosition: THREE.Vector3;

    constructor(parts: Queue<Particle>, headPos: THREE.Vector3,
        dir: THREE.Vector3) {
        this.particles = parts;
        this.direction = dir;
        this.headPosition = headPos;
    }

    public getLength(): number {
        return this.particles.getLength();
    }

    public growHead() {
        var head: Particle;

        // calculate new head position

        this.particles.enqueue(head);

        // update direction, headPosition
    }

    public chopTail() {
        this.particles.dequeue();
    }

    public turn(input: String) {
        var LEFT = "A";
        var RIGHT = "D";
        var rotationAngle = Math.PI / 6;

        if (input === LEFT) {
            this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), rotationAngle);
        }
        else if (input === RIGHT) {
            this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), rotationAngle);
        }
    }

    public moveForward() {
        this.chopTail();
        this.growHead();
    }
}
