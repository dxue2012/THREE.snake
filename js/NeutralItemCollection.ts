class NeutralItemCollection {
    private foodCollection: Array<IFoodParticle>;

    constructor(private scene: THREE.Scene) {
        this.foodCollection = [];
    }

    // TODO: move this function to Utils
    private static randomPointOnSphere(r: number) {
        // using the method described here:
        // http://mathworld.wolfram.com/SpherePointPicking.html
        var u = Math.random();
        var v = Math.random();
        var theta = 2 * Math.PI * u;
        var phi = Math.acos(2 * v - 1);

        var x = r * Math.sin(phi) * Math.cos(theta);
        var y = r * Math.sin(phi) * Math.sin(theta);
        var z = r * Math.cos(phi);

        return new THREE.Vector3(x, y, z);
    }

    public getFoodCollection(): Array<IFoodParticle> {
        return this.foodCollection;
    }

    public respawnFood(foodParticle: IFoodParticle) {
        this._deleteFood(foodParticle);
        this.spawnFood();
    }

    private _deleteFood(foodParticle: IFoodParticle) {
        this.scene.remove(foodParticle.sphere);

        var index = this.foodCollection.indexOf(foodParticle);
        if (index > -1) {
            this.foodCollection.splice(index, 1);
        }
    }

    // make food disappear after a while
    public spawnFood() {
        // TODO: assume map is a unit sphere
        var spawnLocation = NeutralItemCollection.randomPointOnSphere(1);
        var rand = Math.random();
        if (rand < 0.1) {
            var food = new FoodParticle(spawnLocation, FoodParticle.ENHANCE_VALUE);
            // spawn a special food that boosts length by 20
        }
        else if (rand < 0.5){
          var food = new FoodParticle(spawnLocation, FoodParticle.INVINCIBLE_VALUE);
          // spawn a golden pallet for invulnerability and length boost of 15
        }
        else if (rand < 0.9){
          var food = new FoodParticle(spawnLocation, FoodParticle.BOOST_VALUE);
          // spawn a special food that boosts speed by 1.5
        }
        else {
          var food = new FoodParticle(spawnLocation);
          // normal food that boosts length by 10
        }
        this.scene.add(food.sphere);

        this.foodCollection.push(food);
    }
}
