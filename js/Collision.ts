class Collision {


    // returns true if snakeA bumps into snakeB
    // TODO: handle self-collision more gracefully
    public static snakeWithSnake(snakeA: ISnake, snakeB: ISnake): boolean {
        if (snakeA.isInvulnerable()) {
            return false;
        }

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

    public static snakeWithFood(snake: ISnake, foodParticle: FoodParticle): boolean {
        var snakeHead = new THREE.Sphere(snake.headPosition, 0.05);
        var foodSphere = new THREE.Sphere(foodParticle.position, 0.05);

        return snakeHead.intersectsSphere(foodSphere);
    }
}
