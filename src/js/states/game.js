var Player = require('../entities/player');
var Gramma = require('../entities/gramma');
var Boost = require('../entities/boost');

var Game = function () {
    this.runner = null;
    this.land = null;
    this.grammas = null;
    this.nextGramma = null;
    this.timer = 0;
    this.stageLength = 60 * 500;
    this.boosts = null;
    this.runTimer = null;
};

module.exports = Game;

Game.prototype = {

    create: function () {

        this.world.setBounds(0, 0, 360, this.stageLength);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.land = this.add.tileSprite(0, 0, 360, 640, 'floortile');
        this.land.scale.set(2);
        this.land.smoothed = false;
        this.land.fixedToCamera = true;

        this.runner = new Player(this.game, 360/2, 200);
        this.grammas = this.add.group();

        this.camera.follow(this.runner);
        this.camera.deadzone = new Phaser.Rectangle(0, 0, 360, 250);

        this.nextGramma = 640;

        this.runTimer = this.time.events.add(Phaser.Timer.SECOND * 60, this.endGame, this);
        this.timer = this.game.add.text(this.world.centerX, 0, "60");
        this.timer.fixedToCamera = true;

        this.timer.anchor.set(0.5, 0);

        // Drop a boost on the level
        this.boosts = this.add.group();

        var boost = new Boost(this.game, 360/2, 600);

        this.boosts.add(boost);

    },

    update: function () {

        // scroll the screen
        this.camera.y += 6;

        var timeLeft = Math.floor(this.runTimer.timer.duration / 1000);
        var distanceLeft = this.stageLength - this.camera.y - 640;

        this.timer.setText(timeLeft + ' || ' + distanceLeft);

        this.physics.arcade.collide(this.runner, this.grammas);
        this.physics.arcade.collide(this.runner, this.boosts, this.collectBoost, null, this);

        this.runner.body.velocity.x = 0;

        // Key press to right
        if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.runner.body.velocity.x = + 300;
        }

        // Key press to left
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.runner.body.velocity.x = - 300;
        }

        this.grammas.sort('y', Phaser.Group.SORT_ASCENDING);

        // the ammount is halved due to scaling
        this.land.tilePosition.x = -this.camera.x / 2;
        this.land.tilePosition.y = -this.camera.y / 2;

        if (this.camera.y > this.nextGramma) {
            this.addGramma();
        }

        // If he falls behind too much you lose
        if (this.runner.position.y <= this.camera.y) {
            this.endGame();
        }

        // When you get to the end you win
        if (distanceLeft == 0) {
            this.endGame(true);
        }
    },

    render: function () {
        // this.game.debug.bodyInfo(this.runner, 32, 32);
        // this.game.debug.body(this.runner, 32, 32);
    },

    addGramma: function () {
        var gramma = new Gramma(
            this.game,
            Math.random() * 360,
            this.camera.y + 640
        );

        // this.game.debug.body(gramma);
        this.grammas.add(gramma);
        this.nextGramma+= 320;
    },

    endGame: function (win) {
        var score = 0;

        if (win) {
            this.game.state.start('Win');
            score = Math.round(this.time.events.duration / 100);
            window.playerState.scores.push(score);
        } else {
            this.game.state.start('Lose');
        }
    },

    collectBoost: function (runner, boost) {
        boost.kill();
        this.runner.collectBoost();
        // this.time.events.add(Phaser.Timer.SECOND * 10, this.runner.endBoost);
    }
};
