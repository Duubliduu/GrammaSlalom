var Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'runner');
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.scale.set(2);
    this.smoothed = false;
    this.animations.add('run');
    this.animations.play('run', 10, true);
    this.body.bounce.setTo(0, 0);
    this.body.setSize(18, 10, 3, 26);
    this.body.maxVelocity = new Phaser.Point(1000, 1000);
    this.body.collideWorldBounds = true;
    this.mass = 2;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
Player.prototype.update = function () {

    // Add speed to runner
    if (this.body.velocity.x == 0) {
        this.body.velocity.y += 1;
    }
};

module.exports = Player;
