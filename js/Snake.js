var Snake = (function () {
    function Snake(headPos, dir, sphere, scene) {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();
        this.surface = sphere;
        this.scene = scene;
        for (var i = 0; i < Snake.INIT_LENGTH; i++) {
            this.growHead();
        }
    }
    Snake.prototype.getLength = function () {
        return this.particles.getLength();
    };
    Snake.prototype.growHead = function () {
        var head;
        var deltaT = 1 / 50.0;
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);
        head = new Particle(this.headPosition.clone());
        this.particles.enqueue(head);
        var normal = this.headPosition.clone().normalize();
        var normDir = normal.clone().multiplyScalar(this.direction.dot(normal));
        this.direction.sub(normDir).normalize();
        this.scene.add(head.sphere);
    };
    Snake.prototype.chopTail = function () {
        var tailParticle = this.particles.dequeue();
        this.scene.remove(tailParticle.sphere);
    };
    Snake.prototype.turn = function (leftOrRight) {
        var rotationAngle = Math.PI / 60;
        this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), leftOrRight * rotationAngle);
    };
    Snake.prototype.moveForward = function () {
        this.chopTail();
        this.growHead();
    };
    Snake.prototype._checkInvariants = function () {
    };
    Snake.INIT_LENGTH = 100;
    Snake.LEFT = 1;
    Snake.RIGHT = -1;
    return Snake;
})();
