var FoodParticle = (function () {
    function FoodParticle(pos, value) {
        this.position = pos;
        this.value = value ? value : FoodParticle.DEFAULT_VALUE;
        if (this.value === FoodParticle.DEFAULT_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.04, 4, 4);
            var pink = new THREE.Color(0xffb6c1);
            var normMaterial = new THREE.MeshLambertMaterial({ color: pink.getHex() });
            this.sphere = new THREE.Mesh(sphereGeo, normMaterial);
        }
        else if (this.value === FoodParticle.ENHANCE_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var lavTexture = THREE.ImageUtils.loadTexture('images/stripe.png');
            var lavMaterial = new THREE.MeshLambertMaterial({ map: lavTexture });
            this.sphere = new THREE.Mesh(sphereGeo, lavMaterial);
        }
        else if (this.value === FoodParticle.INVINCIBLE_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var goldTexture = THREE.ImageUtils.loadTexture('images/golden.jpg');
            var goldMaterial = new THREE.MeshLambertMaterial({ map: goldTexture });
            this.sphere = new THREE.Mesh(sphereGeo, goldMaterial);
        }
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
    FoodParticle.DEFAULT_VALUE = 10;
    FoodParticle.ENHANCE_VALUE = 20;
    FoodParticle.INVINCIBLE_VALUE = 15;
    return FoodParticle;
})();
