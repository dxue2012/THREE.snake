class Particle implements IParticle {
    position: THREE.Vector3;
    sphere: THREE.Mesh;

    constructor(pos: THREE.Vector3) {
        this.position = pos;

        var sphereGeo = new THREE.SphereGeometry(0.05, 2, 2);
        var standardMaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff });
        this.sphere = new THREE.Mesh(sphereGeo, standardMaterial);

        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
}
