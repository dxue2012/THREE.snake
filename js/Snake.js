var Snake = (function () {
    function Snake(headPos, dir, speed, sphere, scene, leftOrRight, color) {
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
        var headGeo = new THREE.TetrahedronGeometry(0.05);
        var headMat = new THREE.MeshBasicMaterial({ color: this.color.getHex(), wireframe: true });
        this.head = new THREE.Mesh(headGeo, headMat);
        this.head.position.set(headPos.x, headPos.y, headPos.z);
        this.scene.add(this.head);
        this.invulnerableBar = $('#' + leftOrRight + '-invulnerable-bar');
        this.invulnerableBar.hide();
        this.speedupBar = $('#' + leftOrRight + '-speedup-bar');
        this.speedupBar.hide();
        for (var i = 0; i < Snake.INIT_LENGTH; i++) {
            this.growHead(Snake.DEFAULT_SPEED);
        }
    }
    Snake.prototype.getLength = function () {
        return this.particles.getLength();
    };
    Snake.prototype.stopStatusBars = function () {
        this._stopInvulnerableBar();
        this._stopSpeedupBar();
    };
    Snake.prototype._stopSpeedupBar = function () {
        this.speedupBar.stop();
    };
    Snake.prototype._stopInvulnerableBar = function () {
        this.invulnerableBar.stop();
    };
    Snake.prototype._animateStatusBar = function (statusBar, duration) {
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
            complete: function () {
                statusBar.hide();
            }
        });
    };
    Snake.prototype._animateSpeedupBar = function (duration) {
        var otherZIndex = +this.invulnerableBar.css('z-index');
        this.speedupBar.css('z-index', otherZIndex - 1);
        this._animateStatusBar(this.speedupBar, duration);
    };
    Snake.prototype._animateInvulnerableBar = function (duration) {
        var otherZIndex = +this.speedupBar.css('z-index');
        this.invulnerableBar.css('z-index', otherZIndex - 1);
        this._animateStatusBar(this.invulnerableBar, duration);
    };
    Snake.prototype._setStatusBarColor = function (statusBar, color) {
        statusBar.css('background-color', color);
    };
    Snake.prototype._setInvulnerableBarColor = function (color) {
        this._setStatusBarColor(this.invulnerableBar, color);
    };
    Snake.prototype._setSpeedupBarColor = function (color) {
        this._setStatusBarColor(this.speedupBar, color);
    };
    Snake.prototype.makeInvulnerable = function (time) {
        this.invulnerableTime = time;
        this._setInvulnerableBarColor("#ffd700");
        this._animateInvulnerableBar(Snake.INVULNERABLE_DURATION);
    };
    Snake.prototype.isInvulnerable = function () {
        return this.invulnerableTime > 0;
    };
    Snake.prototype.boost = function (duration) {
        this.speedupTime = duration;
        this.speed = Snake.BOOSTED_SPEED;
        this._setSpeedupBarColor("#c0c0c0");
        this._animateSpeedupBar(Snake.SPEEDUP_DURATION);
    };
    Snake.prototype.isSpeedingup = function () {
        return this.speedupTime > 0;
    };
    Snake.prototype.shorten = function (length) {
        for (var i = 0; i < length; i++) {
            this.chopTail();
        }
    };
    Snake.prototype.growLength = function (length) {
        this.lengthToGrow += length;
    };
    Snake.prototype.growHead = function (fastness) {
        var headParticle;
        var deltaT = fastness;
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);
        headParticle = new Particle(this.headPosition.clone(), this.color);
        this.particles.enqueue(headParticle);
        var normal = this.headPosition.clone().normalize();
        var normDir = normal.clone().multiplyScalar(this.direction.dot(normal));
        this.direction.sub(normDir).normalize();
        this.scene.add(headParticle.sphere);
        var isFast = this.isSpeedingup();
        var isStrong = this.isInvulnerable();
        if (!isFast && !isStrong) {
            this.scene.remove(this.head);
            var headGeo = new THREE.TetrahedronGeometry(0.08);
            var headMat = new THREE.MeshBasicMaterial({ color: this.color.getHex(), wireframe: true, wireframeLinewidth: 2 });
            this.head = new THREE.Mesh(headGeo, headMat);
            this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
            this.scene.add(this.head);
        }
        else if (isFast) {
            this.scene.remove(this.head);
            var headGeo = new THREE.TetrahedronGeometry(0.08);
            var silver = new THREE.Color(0xc0c0c0);
            var headMat = new THREE.MeshBasicMaterial({ color: silver.getHex(), wireframe: true, wireframeLinewidth: 6, wireframeLinecap: 'round' });
            this.head = new THREE.Mesh(headGeo, headMat);
            this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
            this.scene.add(this.head);
        }
        else if (isStrong) {
            this.scene.remove(this.head);
            var headGeo = new THREE.TetrahedronGeometry(0.08);
            var golden = new THREE.Color(0xffd700);
            var headMat = new THREE.MeshBasicMaterial({ color: golden.getHex(), wireframe: true, wireframeLinewidth: 6, wireframeLinecap: 'round' });
            this.head = new THREE.Mesh(headGeo, headMat);
            this.head.position.set(this.headPosition.x, this.headPosition.y, this.headPosition.z);
            this.scene.add(this.head);
        }
    };
    Snake.prototype.chopTail = function () {
        var tailParticle = this.particles.dequeue();
        this.scene.remove(tailParticle.sphere);
    };
    Snake.prototype.turn = function (leftOrRight) {
        var rotationAngle = Math.PI / 60;
        this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), leftOrRight * rotationAngle);
    };
    Snake.prototype.moveForward = function () {
        if (this.isSpeedingup()) {
            this.growHead(Snake.BOOSTED_SPEED);
        }
        else {
            this.growHead(Snake.DEFAULT_SPEED);
        }
        if (this.lengthToGrow <= 0) {
            this.chopTail();
        }
        else {
            this.lengthToGrow--;
        }
        this.invulnerableTime = (this.invulnerableTime > 0) ? this.invulnerableTime - 1 : 0;
        this.speedupTime = (this.speedupTime > 0) ? this.speedupTime - 1 : 0;
    };
    Snake.prototype._checkInvariants = function () {
    };
    Snake.INIT_LENGTH = 50;
    Snake.DEFAULT_COLOR = new THREE.Color(0x0000ff);
    Snake.DEFAULT_SPEED = 1 / 50.0;
    Snake.BOOSTED_SPEED = 1 / 30.0;
    Snake.LEFT = 1;
    Snake.RIGHT = -1;
    Snake.INVULNERABLE_DURATION = Math.round(Updater.InvulnerableTime / 60 * 1000);
    Snake.SPEEDUP_DURATION = Math.round(Updater.SpeedupTime / 60 * 1000);
    return Snake;
})();
