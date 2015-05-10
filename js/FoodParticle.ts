class FoodParticle implements IFoodParticle {
    private static DEFAULT_VALUE = 10;

    position: THREE.Vector3;
    sphere: THREE.Mesh;
    value: number;

    constructor(pos: THREE.Vector3, value?: number) {
        this.position = pos;
        var sphereGeo = new THREE.SphereGeometry(0.05, 4, 4);
        var standardMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.sphere = new THREE.Mesh(sphereGeo, standardMaterial);
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;

        this.value = value ? value : FoodParticle.DEFAULT_VALUE;
    }
}
