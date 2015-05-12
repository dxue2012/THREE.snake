var FoodParticle = (function () {
    function FoodParticle(pos, value) {
        this.position = pos;
        this.value = value ? value : FoodParticle.DEFAULT_VALUE;
        if (this.value === FoodParticle.DEFAULT_VALUE) {
            var tetraGeo = new THREE.SphereGeometry(0.04, 4, 4);
            var lightBlue = new THREE.Color(0xadd8e6);
            var normMaterial = new THREE.MeshPhongMaterial({ color: lightBlue.getHex() });
            this.sphere = new THREE.Mesh(tetraGeo, normMaterial);
        }
        else if (this.value === FoodParticle.ENHANCE_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var stripeTexture = THREE.ImageUtils.loadTexture('images/stripe.png');
            var stripeMaterial = new THREE.MeshPhongMaterial({ map: stripeTexture });
            this.sphere = new THREE.Mesh(sphereGeo, stripeMaterial);
        }
        else if (this.value === FoodParticle.INVINCIBLE_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var goldTexture = THREE.ImageUtils.loadTexture('images/golden.jpg');
            var goldMaterial = new THREE.MeshPhongMaterial({ map: goldTexture });
            this.sphere = new THREE.Mesh(sphereGeo, goldMaterial);
        }
        else if (this.value === FoodParticle.BOOST_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var stripeTexture = THREE.ImageUtils.loadTexture('images/uv_grid.jpg');
            var stripeMaterial = new THREE.MeshPhongMaterial({ map: stripeTexture });
            this.sphere = new THREE.Mesh(sphereGeo, stripeMaterial);
        }
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
    FoodParticle.DEFAULT_VALUE = 10;
    FoodParticle.ENHANCE_VALUE = 20;
    FoodParticle.INVINCIBLE_VALUE = 15;
    FoodParticle.BOOST_VALUE = 5;
    return FoodParticle;
})();
