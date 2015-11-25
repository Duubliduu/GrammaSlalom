var Boot = function () {
};

module.exports = Boot;

Boot.prototype = {

    preload: function () {
        this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
        this.game.input.maxPointers = 1;

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.game.state.start('Preloader');
    }
};
