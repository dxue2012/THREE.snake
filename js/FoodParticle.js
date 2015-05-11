var FoodParticle = (function () {
    function FoodParticle(pos, value) {
        this.position = pos;
        this.value = value ? value : FoodParticle.DEFAULT_VALUE;
        if (this.value === FoodParticle.DEFAULT_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var grassTexture = THREE.ImageUtils.loadTexture('images/amethyst.png');
            var grassMaterial = new THREE.MeshLambertMaterial({ map: grassTexture });
            this.sphere = new THREE.Mesh(sphereGeo, grassMaterial);
        }
        else {
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var lavTexture = THREE.ImageUtils.loadTexture('images/stripe.png');
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
