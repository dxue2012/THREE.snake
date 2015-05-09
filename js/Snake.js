var Snake = (function () {
    function Snake(headPos, dir, sphere) {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();
        this.surface = sphere;
        for (var i = 0; i < 30; i++) {
            this.growHead();
        }
    }
    Snake.prototype.getLength = function () {
        return this.particles.getLength();
    };
    Snake.prototype.growHead = function () {
        var head;
        var deltaT = 1 / 10.0;
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);
        head = new Particle(this.headPosition);
        this.particles.enqueue(head);
        var normal = this.headPosition.clone().normalize();
        var normDir = normal.clone().multiplyScalar(this.direction.dot(normal));
        this.direction.sub(normDir).normalize();
    };
    Snake.prototype.chopTail = function () {
        this.particles.dequeue();
    };
    Snake.prototype.turn = function (input) {
        var LEFT = "A";
        var RIGHT = "D";
        var rotationAngle = Math.PI / 6;
        if (input === LEFT) {
            this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), rotationAngle);
        }
        else if (input === RIGHT) {
            this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), rotationAngle);
        }
    };
    Snake.prototype.moveForward = function () {
        this.chopTail();
        this.growHead();
    };
    Snake.prototype._checkInvariants = function () {
    };
    return Snake;
})();
