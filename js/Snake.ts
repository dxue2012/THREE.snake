declare var Queue;

class Snake implements ISnake {
    public static LEFT: number = 1;
    public static RIGHT: number = -1;

    private static INIT_LENGTH: number = 50;
    private static DEFAULT_COLOR: THREE.Color = new THREE.Color(0x0000ff);
    private static INVULNERABLE_DURATION: number = 3333;

    particles: Queue<IParticle>;
    direction: THREE.Vector3;
    headPosition: THREE.Vector3;
    invulnerableTime: number;
    lengthToGrow: number;
    color: THREE.Color;
    head: THREE.Mesh;

    private statusBar: JQuery;

    // for now assume surface is a sphere centered at origin
    surface: THREE.Sphere;
    scene: THREE.Scene;

    constructor(
        headPos: THREE.Vector3,
        dir: THREE.Vector3,
        // head: THREE.Mesh,
        sphere: THREE.Sphere,
        scene: THREE.Scene,
        statusBarId: string,
        color?: THREE.Color) {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();

        this.surface = sphere;
        this.scene = scene;

        this.invulnerableTime = 0;
        this.lengthToGrow = 0;

        this.color = color ? color : Snake.DEFAULT_COLOR;

        // var headGeo = new THREE.SphereGeometry(0.1, 2,2);
        var headGeo = new THREE.TetrahedronGeometry(0.05);
        var headMat = new THREE.MeshBasicMaterial( {color: this.color.getHex(), wireframe: true} );
        this.head = new THREE.Mesh(headGeo, headMat);
        this.head.position.set(headPos.x, headPos.y, headPos.z);
        this.scene.add(this.head);

        this.statusBar = $('#' + statusBarId);

        // var ballTexture = THREE.ImageUtils.loadTexture( 'images/snake.png' );
      	// var ballMaterial = new THREE.MeshBasicMaterial( { map: ballTexture, transparent : true, side: THREE.DoubleSide } );
        //
      	// var planeGeometry = new THREE.PlaneGeometry(1,1,1);
      	// this.head = new THREE.Mesh( planeGeometry, ballMaterial );
      	// this.head.position.set( headPos.x, headPos.y, headPos.z );
      	// this.scene.add(this.head);

        for (var i = 0; i < Snake.INIT_LENGTH; i++) {
            this.growHead();
        }
    }

    public getLength(): number {
        return this.particles.getLength();
    }

    private _animateStatusBar(duration: number) {
        if (this.statusBar.is(":visible")) {
            this.statusBar.stop();
        }

        this.statusBar.css('width', '100%').attr('aria-valuenow', 100);
        this.statusBar.show();
        this.statusBar.animate({
            width: '0px',
        }, {
            duration: duration,
            easing: "linear",
            complete: () => {
                this.statusBar.hide();
            }
        });
    }

    private _setStatusBarColor(color: string) {
        this.statusBar.css('background-color', color);
    }

    public makeInvulnerable(time: number) {
        this.invulnerableTime = time;

        this._setStatusBarColor("#ffd700");
        this._animateStatusBar(Snake.INVULNERABLE_DURATION);
    }

    public isInvulnerable(): boolean {
        return this.invulnerableTime > 0;
    }

    public shorten(length: number): void {
        for (let i = 0; i < length; i++) {
            this.chopTail();
        }
    }

    public growLength(length: number): void {
        this.lengthToGrow += length;
    }

    public growHead() {
        var headParticle: Particle;
        var deltaT = 1 / 50.0;

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

        // update the head mesh based on invulnerability
        if (this.isInvulnerable()) {
            this.scene.remove(this.head);
            var headGeo = new THREE.TetrahedronGeometry(0.08);
            var golden = new THREE.Color(0xffd700);
            var headMat = new THREE.MeshBasicMaterial( {color: golden.getHex(), wireframe: true, wireframeLinewidth:6, wireframeLinecap: 'round'} );
            this.head = new THREE.Mesh(headGeo, headMat);
            this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
            this.scene.add(this.head);
        }
        else {
          this.scene.remove(this.head);
          var headGeo = new THREE.TetrahedronGeometry(0.08);
          var headMat = new THREE.MeshBasicMaterial( {color: this.color.getHex(), wireframe: true, wireframeLinewidth:2} );
          this.head = new THREE.Mesh(headGeo, headMat);
          this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
          this.scene.add(this.head);
        }
        // this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
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
        this.growHead();

        // grow a certain length
        if (this.lengthToGrow <= 0) {
            this.chopTail();
        } else {
            this.lengthToGrow--;
        }

        this.invulnerableTime = (this.invulnerableTime > 0) ? this.invulnerableTime - 1 : 0;
    }

    private _checkInvariants() {
    }

}
