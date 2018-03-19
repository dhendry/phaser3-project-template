import 'phaser';
import BouncingLogoExample from "./BouncingLogoExample";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [BouncingLogoExample]
};

var game = new Phaser.Game(config);

/*
function preload ()
{
    this.load.image('logo', 'assets/logo.png');
}

function create ()
{
    var logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}
*/
