var Menu = function () {
    this.text = null;
};

module.exports = Menu;

Menu.prototype = {

    create: function () {
        var style = {font: "24px Arial", fill: "#ffffff", align: "center"},
            text = this.add.text(this.world.centerX, 200, "Press to Start", style);

        this.stage.backgroundColor = "#000000";

        text.anchor.set(0.5, 0);

        this.input.onDown.add(this.onDown, this);
    },

    update: function () {
    },

    onDown: function () {
        this.game.state.start(playerState.currentLevel);
        // this.game.state.start('Win');
    }
};
