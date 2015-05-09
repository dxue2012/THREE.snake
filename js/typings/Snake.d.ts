interface ISnake {
    particles: Queue<IParticle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;

    // its environment
    surface: THREE.Sphere;
    scene: THREE.Scene;

    turn(input: String);
}
