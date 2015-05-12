declare var Queue;

class Snake implements ISnake {
    private static INIT_LENGTH: number = 50;
    private static DEFAULT_COLOR: THREE.Color = new THREE.Color(0x0000ff);
    public static DEFAULT_SPEED: number = 1/50.0;
    public static BOOSTED_SPEED: number = 1/30.0;

    public static LEFT: number = 1;
    public static RIGHT: number = -1;

    private static INVULNERABLE_DURATION: number = Math.round(Updater.InvulnerableTime / 60 * 1000);
    private static SPEEDUP_DURATION: number = Math.round(Updater.SpeedupTime / 60 * 1000);

    particles: Queue<IParticle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;
    invulnerableTime: number;
    speedupTime: number;
    lengthToGrow: number;
    speed: number;
    color: THREE.Color;
    head: THREE.Mesh;

    private invulnerableBar: JQuery;
    private speedupBar: JQuery;

    // for now assume surface is a sphere centered at origin
    surface: THREE.Sphere;
    scene: THREE.Scene;

    constructor(
        headPos: THREE.Vector3,
        dir: THREE.Vector3,
        speed: number,
        sphere: THREE.Sphere,
        scene: THREE.Scene,
        leftOrRight: string,
        color?: THREE.Color)
    {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();

        this.surface = sphere;
        this.scene = scene;

        this.invulnerableTime = 0;
        this.speedupTime = 0;
        this.lengthToGrow = 0;
        this.speed = Snake.DEFAULT_SPEED;

        this.color = color ? color : Snake.DEFAULT_COLOR;

        // var headGeo = new THREE.SphereGeometry(0.1, 2,2);
        var headGeo = new THREE.TetrahedronGeometry(0.05);
        var headMat = new THREE.MeshBasicMaterial( {color: this.color.getHex(), wireframe: true} );
        this.head = new THREE.Mesh(headGeo, headMat);
        this.head.position.set(headPos.x, headPos.y, headPos.z);
        this.scene.add(this.head);

        this.invulnerableBar = $('#' + leftOrRight + '-invulnerable-bar');
        this.invulnerableBar.hide();

        this.speedupBar = $('#' + leftOrRight + '-speedup-bar');
        this.speedupBar.hide();

        // var ballTexture = THREE.ImageUtils.loadTexture( 'images/snake.png' );
      	// var ballMaterial = new THREE.MeshBasicMaterial( { map: ballTexture, transparent : true, side: THREE.DoubleSide } );
        //
      	// var planeGeometry = new THREE.PlaneGeometry(1,1,1);
      	// this.head = new THREE.Mesh( planeGeometry, ballMaterial );
      	// this.head.position.set( headPos.x, headPos.y, headPos.z );
      	// this.scene.add(this.head);

        for (var i = 0; i < Snake.INIT_LENGTH; i++) {
            this.growHead(Snake.DEFAULT_SPEED);
        }
    }

    public getLength(): number {
        return this.particles.getLength();
    }


    /**
    Status Bar stuff
    */

    public stopStatusBars() {
        this._stopInvulnerableBar();
        this._stopSpeedupBar();
    }

    private _stopSpeedupBar() {
        this.speedupBar.stop();
    }

    private _stopInvulnerableBar() {
        this.invulnerableBar.stop();
    }

    private _animateStatusBar(statusBar: JQuery, duration: number) {
        if (statusBar.is(":visible")) {
            statusBar.stop();
        }

        statusBar.css('width', '100%').attr('aria-valuenow', 100);
        statusBar.show();
        statusBar.animate({
            width: '0px',
        }, {
            duration: duration,
            easing: "linear",
            complete: () => {
                statusBar.hide();
            }
        });
    }

    private _animateSpeedupBar(duration: number) {

        // lower z-index to set this one behind the other bar
        var otherZIndex: number = +this.invulnerableBar.css('z-index');
        this.speedupBar.css('z-index', otherZIndex - 1);

        this._animateStatusBar(this.speedupBar, duration);
    }

    private _animateInvulnerableBar(duration: number) {

        // lower z-index to set this one behind the other bar
        var otherZIndex: number = +this.speedupBar.css('z-index');
        this.invulnerableBar.css('z-index', otherZIndex - 1);

        this._animateStatusBar(this.invulnerableBar, duration);
    }

    private _setStatusBarColor(statusBar: JQuery, color: string) {
        statusBar.css('background-color', color);
    }

    private _setInvulnerableBarColor(color: string) {
        this._setStatusBarColor(this.invulnerableBar, color);
    }

    private _setSpeedupBarColor(color: string) {
        this._setStatusBarColor(this.speedupBar, color);
    }

    public makeInvulnerable(time: number) {
        this.invulnerableTime = time;

        this._setInvulnerableBarColor("#ffd700");
        this._animateInvulnerableBar(Snake.INVULNERABLE_DURATION);
    }

    public isInvulnerable(): boolean {
        return this.invulnerableTime > 0;
    }

    public boost(duration: number) {
        this.speedupTime = duration;

        // TODO: when do you reset this to default speed??
        this.speed = Snake.BOOSTED_SPEED;

        this._setSpeedupBarColor("#c0c0c0");
        this._animateSpeedupBar(Snake.SPEEDUP_DURATION);
    }

    public isSpeedingup(): boolean {
        return this.speedupTime > 0;
    }

    public shorten(length: number): void {
        for (let i = 0; i < length; i++) {
            this.chopTail();
        }
    }

    public growLength(length: number): void {
        this.lengthToGrow += length;
    }

    public growHead(fastness: number) {
        var headParticle: Particle;
        var deltaT = fastness;

        // update head position
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);

        // update head
        headParticle = new Particle(this.headPosition.clone(), this.color);
        this.particles.enqueue(headParticle);

        // update direction
        var normal: THREE.Vector3 = this.headPosition.clone().normalize();
        var normDir = normal.clone().multiplyScalar(this.direction.dot(normal));
        this.direction.sub(normDir).normalize();

        // add to scene
        this.scene.add(headParticle.sphere);

        // update the head mesh based on speed and invulnerability
        var isFast = this.isSpeedingup();
        var isStrong = this.isInvulnerable();
        if (!isFast && !isStrong) {
          this.scene.remove(this.head);
          var headGeo = new THREE.TetrahedronGeometry(0.08);
          var headMat = new THREE.MeshBasicMaterial( {color: this.color.getHex(), wireframe: true, wireframeLinewidth:2} );
          this.head = new THREE.Mesh(headGeo, headMat);
          this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
          this.scene.add(this.head);
        }
        else if (isFast) {
            this.scene.remove(this.head);
            var headGeo = new THREE.TetrahedronGeometry(0.08);
            var silver = new THREE.Color(0xc0c0c0);
            var headMat = new THREE.MeshBasicMaterial( {color: silver.getHex(), wireframe: true, wireframeLinewidth:6, wireframeLinecap: 'round'} );
            this.head = new THREE.Mesh(headGeo, headMat);
            this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
            this.scene.add(this.head);
        }
        else if (isStrong) {
            this.scene.remove(this.head);
            var headGeo = new THREE.TetrahedronGeometry(0.08);
            var golden = new THREE.Color(0xffd700);
            var headMat = new THREE.MeshBasicMaterial( {color: golden.getHex(), wireframe: true, wireframeLinewidth:6, wireframeLinecap: 'round'} );
            this.head = new THREE.Mesh(headGeo, headMat);
            this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
            this.scene.add(this.head);
        }
    }

    public chopTail() {
        var tailParticle = this.particles.dequeue();

        this.scene.remove(tailParticle.sphere);
    }

    // the input leftOrRight is either -1 or 1
    public turn(leftOrRight: number) {
        var rotationAngle = Math.PI / 60;
        this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), leftOrRight * rotationAngle);
    }

    public moveForward() {
        if (this.isSpeedingup()) {
            this.growHead(Snake.BOOSTED_SPEED);
        } else {
            this.growHead(Snake.DEFAULT_SPEED);
        }

        // grow a certain length
        if (this.lengthToGrow <= 0) {
            this.chopTail();
        } else {
            this.lengthToGrow--;
        }

        this.invulnerableTime = (this.invulnerableTime > 0) ? this.invulnerableTime - 1 : 0;
        this.speedupTime = (this.speedupTime > 0) ? this.speedupTime - 1 : 0;
    }

    private _checkInvariants() {
    }

}
