var Preloader = function (game) {
    this.asset = null;
    this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

    preload: function () {
        this.asset = this.add.sprite(320, 240, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        this.load.image('floortile', 'assets/floortile.png');
        this.load.spritesheet('runner', 'assets/runner.png', 36, 36);
        this.load.spritesheet('gramma', 'assets/gramma.png', 36, 36);

    },

    create: function () {
        this.asset.cropEnabled = false;
    },

    update: function () {
        if (!!this.ready) {
            this.game.state.start('Menu');
        }
    },

    onLoadComplete: function () {
        this.ready = true;
    }
};
