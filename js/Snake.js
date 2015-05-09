var Snake = (function () {
    function Snake(parts, headPos, dir) {
        this.particles = parts;
        this.direction = dir;
        this.headPosition = headPos;
    }
    Snake.prototype.getLength = function () {
        return this.particles.getLength();
    };
    Snake.prototype.growHead = function () {
        var head;
        this.particles.enqueue(head);
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
    return Snake;
})();
