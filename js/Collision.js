var Collision = (function () {
    function Collision() {
    }
    Collision.snakeWithSnake = function (snakeA, snakeB) {
        if (snakeA.isInvulnerable()) {
            return false;
        }
        var snakeAHead = new THREE.Sphere(snakeA.headPosition, 0.05);
        var collided = false;
        if (snakeA != snakeB) { // Different snake: traverse entire body length
            snakeB.particles.forEach(function (currParticle) {
                var currPart = new THREE.Sphere(currParticle.position, 0.05);
                if (currPart.intersectsSphere(snakeAHead)) {
                    collided = true;
                    return false;
                }
                return true;
            });
        }
        else { // Same snake: only traverse >10th particles in the body
            snakeA.particles.forEachInBody(function (currParticle) {
                var currPart = new THREE.Sphere(currParticle.position, 0.05);
                if (currPart.intersectsSphere(snakeAHead)) {
                    collided = true;
                    return false;
                }
                return true;
            });
        }
        return collided;
    };
    Collision.snakeWithFood = function (snake, foodParticle) {
        var snakeHead = new THREE.Sphere(snake.headPosition, 0.05);
        var foodSphere = new THREE.Sphere(foodParticle.position, 0.05);
        return snakeHead.intersectsSphere(foodSphere);
    };
    return Collision;
})();
