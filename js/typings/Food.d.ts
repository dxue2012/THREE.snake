interface IFood {
    particles: Array<IParticle>;
    surface: THREE.Sphere;
    scene: THREE.Scene;

    addFood(sphere, scene);
}
