var FoodParticle = (function () {
    function FoodParticle(pos, value) {
        this.position = pos;
        var sphereGeo = new THREE.SphereGeometry(0.05, 4, 4);
        var standardMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.sphere = new THREE.Mesh(sphereGeo, standardMaterial);
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
        this.value = value ? value : FoodParticle.DEFAULT_VALUE;
    }
    FoodParticle.DEFAULT_VALUE = 10;
    return FoodParticle;
})();
