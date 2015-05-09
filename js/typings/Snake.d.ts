interface ISnake {
    particles: Queue<IParticle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;
    surface: THREE.Sphere;

    turn(input: String);
}
