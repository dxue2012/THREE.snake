interface ISnake {
    particles: Queue<Particle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;

    turn(input: String);
}
