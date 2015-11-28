var Gramma = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'gramma');
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.scale.set(1);
    this.anchor.setTo(0.5, 0.5);
    this.smoothed = false;
    this.animations.add('run');
    this.animations.play('run', 10, true);
    this.body.bounce.setTo(1, 1);
    this.body.setSize(120, 40, 0, 60);
    this.body.immovable = true;
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

    this.z = this.position.y;

    // Add speed to gramma
    this.body.velocity.y = 150;

    if (this.direction == 1) {
        this.body.velocity.x = Math.random() * 50;
    } else {
        this.body.velocity.x = Math.random() * -50;
    }

    // Remove the gramma when it leaves the screen
    if (this.position.y < this.game.camera.y) {
        this.kill();
    }
};

module.exports = Gramma;
