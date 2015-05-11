var FoodParticle = (function () {
    function FoodParticle(pos, value) {
        this.position = pos;
        this.value = value ? value : FoodParticle.DEFAULT_VALUE;
        if (this.value === FoodParticle.DEFAULT_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.05, 4, 4);
            var standardMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            this.sphere = new THREE.Mesh(sphereGeo, standardMaterial);
        }
        else {
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var lavTexture = THREE.ImageUtils.loadTexture('images/lavatile.jpg');
            var lavMaterial = new THREE.MeshLambertMaterial({ map: lavTexture });
            this.sphere = new THREE.Mesh(sphereGeo, lavMaterial);
        }
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
    FoodParticle.DEFAULT_VALUE = 10;
    return FoodParticle;
})();
