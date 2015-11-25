var Player = require('../entities/player');
var Gramma = require('../entities/gramma');

var Game = function () {
    this.runner = null;
    this.land = null;
    this.grammas = null;
    this.nextGramma = 640;
};

module.exports = Game;

Game.prototype = {

    create: function () {

        var stageLength = 100;

        this.world.setBounds(0, 0, 360, 640 * stageLength);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.land = this.add.tileSprite(0, 0, 360, 640, 'floortile');
        this.land.scale.set(2);
        this.land.smoothed = false;
        this.land.fixedToCamera = true;

        this.runner = new Player(this.game, 360/2, 0);
        this.grammas = this.add.group();

        this.camera.follow(this.runner);

        this.time.events.add(Phaser.Timer.SECOND * 60, this.endGame, this);
    },

    update: function () {

        this.physics.arcade.collide(this.runner, this.grammas);

        this.runner.body.velocity.x = 0;

        // Key press to right
        if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.runner.body.velocity.x = + 300;
        }

        // Key press to left
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.runner.body.velocity.x = - 300;
        }


        // the ammount is halved due to scaling
        this.land.tilePosition.x = -this.camera.x / 2;
        this.land.tilePosition.y = -this.camera.y / 2;

        if (this.camera.y > this.nextGramma) {
            this.addGramma();
        }
    },

    render: function () {

        // this.game.debug.bodyInfo(this.runner, 32, 32);
        // this.game.debug.body(this.runner, 32, 32);

    },

    collisionHandler: function (runner, grammas) {
        runner.body.velocity.y = 0;
    },

    addGramma: function () {
        var gramma = new Gramma(
            this.game,
            this.runner.x + (90 - (Math.random() * 180)),
            this.camera.y + 640
        );
        
        // this.game.debug.body(gramma);
        this.grammas.add(gramma);
        this.nextGramma+= 640;
    },

    endGame: function () {

    }
};
