var Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'runner');
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.smoothed = false;
    this.animations.add('run', [0,1,2,3,4,5]);
    this.animations.add('walk', [6,7,8,9,10]);
    this.animations.add('sprint', [11,12,13,14]);
    this.body.bounce.setTo(0, 0);
    this.body.setSize(40, 40, 0, 40);
    this.body.maxVelocity = new Phaser.Point(1000, 2000);
    this.body.collideWorldBounds = true;
    this.mass = 2;
    this.body.velocity.y = 250;
    this.speedBoost = false;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
Player.prototype.update = function () {

    var animationSpeed = Math.ceil(this.body.velocity.y / 40);

    if (this.body.velocity.y > 1000) {
        this.animations.play('sprint', animationSpeed, true);
    } else if (this.body.velocity.y > 500) {
        this.animations.play('run', animationSpeed, true);
    } else {
        this.animations.play('walk', animationSpeed, true);
    }

    this.animations.currentAnim.speed = animationSpeed;

    this.z = this.position.y;

    // Add speed to runner
    //if (this.speedBoost === true) {
    //    this.body.velocity.y = 1500;
    //}

    this.body.velocity.y += 10 - (this.body.velocity.y / 10000);

};

Player.prototype.collectBoost = function () {
    this.body.velocity.y = 1500;
    // this.speedBoost = true;
}

Player.prototype.endBoost = function () {
    this.speedBoost = false;
}


module.exports = Player;
