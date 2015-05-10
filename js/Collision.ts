class Collision {

    // returns true if snakeA bumps into snakeB
    public static snakeWithSnake(snakeA: ISnake, snakeB: ISnake): boolean {
        var snakeAHead = new THREE.Sphere(snakeA.headPosition, 0.05);

        var collided: boolean = false;
        snakeB.particles.forEach((currParticle: Particle) => {
            var currPart = new THREE.Sphere(currParticle.position, 0.05);
            if (currPart.intersectsSphere(snakeAHead)) {
                collided = true;
                // do something

                return false;
            }

            return true;
        });

        return collided;
    }
}
