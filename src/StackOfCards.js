import * as Phaser from "phaser";

export default class StackOfCards extends Phaser.Scene {
    constructor() {
        super({key: 'StackOfCards'});
    }

    preload() {
        this.load.atlas('cards', 'assets/cards.png', 'assets/cards.json');
    }

    create() {
        //  Create a stack of random cards

        var frames = this.textures.get('cards').getFrameNames();

        var x = 100;
        var y = 100;

        for (var i = 0; i < 64; i++) {
            var image = this.add.image(x, y, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();

            this.input.setDraggable(image);

            x += 4;
            y += 4;
        }

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);

        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

    }
}
