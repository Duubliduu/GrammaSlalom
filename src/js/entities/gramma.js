var Gramma = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'gramma');
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.scale.set(2);
    this.smoothed = false;
    this.animations.add('run');
    this.animations.play('run', 10, true);
    this.body.immovable = true;
    this.body.bounce.setTo(1,1);
    this.body.setSize(12,36,4,0);
}

Gramma.prototype = Object.create(Phaser.Sprite.prototype);
Gramma.prototype.constructor = Gramma;

/**
 * Automatically called by World.update
 */
Gramma.prototype.update = function () {

    // Add speed to runner
    // this.body.velocity.y+=1;
};

module.exports = Gramma;
