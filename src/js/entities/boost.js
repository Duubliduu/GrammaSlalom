var Boost = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'runner');
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('idle', [15]);
    this.animations.play('idle');
    this.body.setSize(90, 40, 0, 0);
}

Boost.prototype = Object.create(Phaser.Sprite.prototype);
Boost.prototype.constructor = Boost;

/**
 * Automatically called by World.update
 */
Boost.prototype.update = function () {

};

module.exports = Boost;
