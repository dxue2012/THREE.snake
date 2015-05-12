var NeutralItemCollection = (function () {
    function NeutralItemCollection(scene) {
        this.scene = scene;
        this.foodCollection = [];
    }
    NeutralItemCollection.randomPointOnSphere = function (r) {
        var u = Math.random();
        var v = Math.random();
        var theta = 2 * Math.PI * u;
        var phi = Math.acos(2 * v - 1);
        var x = r * Math.sin(phi) * Math.cos(theta);
        var y = r * Math.sin(phi) * Math.sin(theta);
        var z = r * Math.cos(phi);
        return new THREE.Vector3(x, y, z);
    };
    NeutralItemCollection.prototype.getFoodCollection = function () {
        return this.foodCollection;
    };
    NeutralItemCollection.prototype.respawnFood = function (foodParticle) {
        this._deleteFood(foodParticle);
        this.spawnFood();
    };
    NeutralItemCollection.prototype._deleteFood = function (foodParticle) {
        this.scene.remove(foodParticle.sphere);
        var index = this.foodCollection.indexOf(foodParticle);
        if (index > -1) {
            this.foodCollection.splice(index, 1);
        }
    };
    NeutralItemCollection.prototype.spawnFood = function () {
        var spawnLocation = NeutralItemCollection.randomPointOnSphere(1);
        var rand = Math.random();
        if (rand < 0.1) {
            var food = new FoodParticle(spawnLocation, FoodParticle.ENHANCE_VALUE);
        }
        else if (rand < 0.5) {
            var food = new FoodParticle(spawnLocation, FoodParticle.INVINCIBLE_VALUE);
        }
        else if (rand < 0.9) {
            var food = new FoodParticle(spawnLocation, FoodParticle.BOOST_VALUE);
        }
        else {
            var food = new FoodParticle(spawnLocation);
        }
        this.scene.add(food.sphere);
        this.foodCollection.push(food);
    };
    return NeutralItemCollection;
})();
