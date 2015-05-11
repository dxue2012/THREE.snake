var Snake = (function () {
    function Snake(headPos, dir, sphere, scene, color) {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();
        this.surface = sphere;
        this.scene = scene;
        this.invulnerableTime = 0;
        this.lengthToGrow = 0;
        this.color = color ? color : Snake.DEFAULT_COLOR;
        var headGeo = new THREE.SphereGeometry(0.05, 2, 2);
        var headMat = new THREE.MeshBasicMaterial({ color: this.color.getHex(), wireframe: true });
        this.head = new THREE.Mesh(headGeo, headMat);
        this.head.position.set(headPos.x, headPos.y, headPos.z);
        this.scene.add(this.head);
        for (var i = 0; i < Snake.INIT_LENGTH; i++) {
            this.growHead();
        }
    }
    Snake.prototype.getLength = function () {
        return this.particles.getLength();
    };
    Snake.prototype.makeInvulnerable = function (time) {
        this.invulnerableTime = time;
    };
    Snake.prototype.isInvulnerable = function () {
        return this.invulnerableTime > 0;
    };
    Snake.prototype.shorten = function (length) {
        for (var i = 0; i < length; i++) {
            this.chopTail();
        }
    };
    Snake.prototype.growLength = function (length) {
        this.lengthToGrow += length;
    };
    Snake.prototype.growHead = function () {
        var headParticle;
        var deltaT = 1 / 50.0;
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);
        headParticle = new Particle(this.headPosition.clone(), this.color);
        this.particles.enqueue(headParticle);
        var normal = this.headPosition.clone().normalize();
        var normDir = normal.clone().multiplyScalar(this.direction.dot(normal));
        this.direction.sub(normDir).normalize();
        this.scene.add(headParticle.sphere);
        if (this.isInvulnerable) {
            ;
        }
        else {
            ;
        }
        this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
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
        this.growHead();
        if (this.lengthToGrow <= 0) {
            this.chopTail();
        }
        else {
            this.lengthToGrow--;
        }
        this.invulnerableTime = (this.invulnerableTime > 0) ? this.invulnerableTime - 1 : 0;
    };
    Snake.prototype._checkInvariants = function () {
    };
    Snake.INIT_LENGTH = 50;
    Snake.DEFAULT_COLOR = new THREE.Color(0x0000ff);
    Snake.LEFT = 1;
    Snake.RIGHT = -1;
    return Snake;
})();
