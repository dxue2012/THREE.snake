class FoodParticle implements IFoodParticle {
    private static DEFAULT_VALUE = 10;
    private static ENHANCE_VALUE = 20;
    private static INVINCIBLE_VALUE = 15;

    position: THREE.Vector3;
    sphere: THREE.Mesh;
    value: number;

    constructor(pos: THREE.Vector3, value?: number) {
        this.position = pos;
        this.value = value ? value : FoodParticle.DEFAULT_VALUE;
        if (this.value === FoodParticle.DEFAULT_VALUE) {
            var sphereGeo = new THREE.SphereGeometry(0.04, 4, 4);
            var pink = new THREE.Color(0xffb6c1);
            var normMaterial = new THREE.MeshLambertMaterial({ color: pink.getHex() });
            this.sphere = new THREE.Mesh(sphereGeo, normMaterial);
        }
        else if (this.value === FoodParticle.ENHANCE_VALUE){
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var lavTexture = THREE.ImageUtils.loadTexture('images/stripe.png');
            var lavMaterial = new THREE.MeshLambertMaterial({ map: lavTexture });
            this.sphere = new THREE.Mesh(sphereGeo, lavMaterial);
        }
        else if (this.value === FoodParticle.INVINCIBLE_VALUE){
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var goldTexture = THREE.ImageUtils.loadTexture('images/golden.jpg');
            var goldMaterial = new THREE.MeshLambertMaterial({ map: goldTexture });
            this.sphere = new THREE.Mesh(sphereGeo, goldMaterial);
        }
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
}
