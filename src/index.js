import 'phaser';
import BouncingLogoExample from "./BouncingLogoExample";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [BouncingLogoExample]
};

var game = new Phaser.Game(config);

