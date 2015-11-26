'use strict';

var game = new Phaser.Game(360, 640, Phaser.AUTO, 'grannyslalom-game');

window.Utils = require('./utils');
window.playerState = {
    currentLevel: 'Game',
    scores:[]
}

game.state.add('Boot', require('./states/boot'));
game.state.add('Splash', require('./states/splash'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Menu', require('./states/menu'));
game.state.add('Game', require('./states/game'));
game.state.add('Score', require('./states/score'));
game.state.add('Win', require('./states/win'));
game.state.add('Lose', require('./states/lose'));

game.state.start('Boot');
