var Lose = function () {
};

module.exports = Lose;

Lose.prototype = {
    create: function () {
        var style = {font: "24px Arial", fill: "#ffffff", align: "center"},
            text = this.add.text(this.world.centerX, 200, "You Lose", style);

        text.anchor.set(0.5, 0);

        this.input.onDown.add(this.onDown, this);
    },

    onDown: function () {
        this.game.state.start('Menu');
    }
};