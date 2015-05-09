class Food implements IFood {
    particles: Array;
    surface: THREE.Sphere;
    scene: THREE.Scene;

    constructor(sphere: THREE.Sphere, scene: THREE.Scene) {
        this.particles = new Array();
        this.surface = sphere;
        this.scene = scene;
    }

    public addFood() {
        var foodPosition = new THREE.Vector3(-1,0,0);
        var sphereGeo = new THREE.SphereGeometry(0.05, 4, 4);
        var standardMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var sphere = new THREE.Mesh(sphereGeo, standardMaterial);
        sphere.position.x = foodPosition.x;
        sphere.position.y = foodPosition.y;
        sphere.position.z = foodPosition.z;

        this.particles.push(sphere);
        scene.add(sphere);
    }

    private _checkInvariants() {
    }

}
