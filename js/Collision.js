var Collision = (function () {
    function Collision() {
    }
    Collision.snakeWithSnake = function (snakeA, snakeB) {
        var snakeAHead = new THREE.Sphere(snakeA.headPosition, 0.05);
        var collided = false;
        snakeB.particles.forEach(function (currParticle) {
            var currPart = new THREE.Sphere(currParticle.position, 0.05);
            if (currPart.intersectsSphere(snakeAHead)) {
                collided = true;
                return false;
            }
            return true;
        });
        return collided;
    };
    return Collision;
})();
