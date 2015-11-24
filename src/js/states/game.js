var Player = require('../entities/player');
var Gramma = require('../entities/gramma');

var Game = function () {
    this.runner = null;
    this.land = null;
};

module.exports = Game;

Game.prototype = {

    create: function () {

        this.world.setBounds(-1000, -1000, 2000, 2000);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.land = this.add.tileSprite(0, 0, 800, 600, 'floortile');
        this.land.scale.set(2);
        this.land.smoothed = false;
        this.land.fixedToCamera = true;

        this.runner = new Player(this.game, 0, 0);
        this.gramma = new Gramma(this.game, 0, 100);

        this.camera.follow(this.runner);
        // this.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
        this.camera.focusOnXY(0, 0);
    },

    update: function () {

        this.physics.arcade.collide(this.runner, this.gramma);

        // Key press to right
        if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.runner.position.x += 10;
        }

        // Key press to left
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.runner.position.x -= 10;
        }

        // the ammount is halved due to scaling
        this.land.tilePosition.x = -this.camera.x / 2;
        this.land.tilePosition.y = -this.camera.y / 2;
    },

    render: function () {

        //this.game.debug.bodyInfo(this.runner, 32, 32);
        //this.game.debug.bodyInfo(this.gramma, 32, 32);
        //this.game.debug.body(this.runner, 32, 32);
        //this.game.debug.body(this.gramma, 32, 32);

    }
};
