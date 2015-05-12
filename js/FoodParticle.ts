class FoodParticle implements IFoodParticle {
    public static DEFAULT_VALUE = 10;
    public static ENHANCE_VALUE = 20; // ENHANCE is for grow length
    public static INVINCIBLE_VALUE = 15;
    public static BOOST_VALUE = 5; // ENHANCE is for speed boost

    position: THREE.Vector3;
    sphere: THREE.Mesh;
    value: number;

    constructor(pos: THREE.Vector3, value?: number) {
        this.position = pos;
        this.value = value ? value : FoodParticle.DEFAULT_VALUE;
        if (this.value === FoodParticle.DEFAULT_VALUE) {
            // var sphereGeo = new THREE.TetrahedronGeometry(0.04);
            var tetraGeo = new THREE.SphereGeometry(0.04, 4, 4);
            // var pink = new THREE.Color(0xffb6c1);
            var lightBlue = new THREE.Color(0xadd8e6);
            var normMaterial = new THREE.MeshPhongMaterial({ color: lightBlue.getHex() });
            this.sphere = new THREE.Mesh(tetraGeo, normMaterial);
        }
        else if (this.value === FoodParticle.ENHANCE_VALUE){
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var stripeTexture = THREE.ImageUtils.loadTexture('images/stripe.png');
            var stripeMaterial = new THREE.MeshPhongMaterial({ map: stripeTexture });
            this.sphere = new THREE.Mesh(sphereGeo, stripeMaterial);
        }
        else if (this.value === FoodParticle.INVINCIBLE_VALUE){
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var goldTexture = THREE.ImageUtils.loadTexture('images/golden.jpg');
            var goldMaterial = new THREE.MeshPhongMaterial({ map: goldTexture });
            this.sphere = new THREE.Mesh(sphereGeo, goldMaterial);
        }
        else if (this.value === FoodParticle.BOOST_VALUE){
            var sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);
            var stripeTexture = THREE.ImageUtils.loadTexture('images/uv_grid.jpg');
            var stripeMaterial = new THREE.MeshPhongMaterial({ map: stripeTexture });
            this.sphere = new THREE.Mesh(sphereGeo, stripeMaterial);
        }
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
}
