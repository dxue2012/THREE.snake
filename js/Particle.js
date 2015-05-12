var Particle = (function () {
    function Particle(pos, color) {
        this.position = pos;
        var sphereGeo = new THREE.SphereGeometry(0.03, 4, 4);
        var standardMaterial = new THREE.MeshBasicMaterial({ color: color.getHex() });
        this.sphere = new THREE.Mesh(sphereGeo, standardMaterial);
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
    return Particle;
})();
