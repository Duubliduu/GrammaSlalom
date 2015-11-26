var Gramma = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'gramma');
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.scale.set(2);
    this.smoothed = false;
    this.animations.add('run');
    this.animations.play('run', 10, true);
    this.body.bounce.setTo(1, 1);
    this.body.setSize(12, 10, 4, 26);
    this.body.mass = .5;
    this.body.collideWorldBounds = false;
    this.checkWorldBounds = true;
    this.direction = Math.round(Math.random() * 1);
}

Gramma.prototype = Object.create(Phaser.Sprite.prototype);
Gramma.prototype.constructor = Gramma;

/**
 * Automatically called by World.update
 */
Gramma.prototype.update = function () {

    // Add speed to gramma
    this.body.velocity.y = Math.random() * 100;

    if (this.direction == 1) {
        this.body.velocity.x = Math.random() * 10;
    } else {
        this.body.velocity.x = Math.random() * -10;
    }

    // Remove the gramma when it leaves the screen
    if (this.position.y < this.game.camera.y) {
        this.kill();
    }
};

module.exports = Gramma;
