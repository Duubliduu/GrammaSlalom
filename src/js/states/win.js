var Win = function () {
};

module.exports = Win;

Win.prototype = {
    create: function () {
        var lastScore = window.playerState.scores[window.playerState.scores.length-1],
            style = {font: "24px Arial", fill: "#ffffff", align: "center"},
            text = this.add.text(this.world.centerX, 200, "You win " + lastScore, style);

        text.anchor.set(0.5, 0);

        this.input.onDown.add(this.onDown, this);
    },

    onDown: function () {
        this.game.state.start('Menu');
    }
};