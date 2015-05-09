var Food = (function () {
    function Food(sphere, scene) {
        this.particles = new Array();
        this.surface = sphere;
        this.scene = scene;
    }
    Food.prototype.addFood = function () {
        var foodPosition = new THREE.Vector3(-1, 0, 0);
        var sphereGeo = new THREE.SphereGeometry(0.05, 4, 4);
        var standardMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var sphere = new THREE.Mesh(sphereGeo, standardMaterial);
        sphere.position.x = foodPosition.x;
        sphere.position.y = foodPosition.y;
        sphere.position.z = foodPosition.z;
        this.particles.push(sphere);
        scene.add(sphere);
    };
    Food.prototype._checkInvariants = function () {
    };
    return Food;
})();
