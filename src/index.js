import 'phaser';
import BouncingLogoExample from "./BouncingLogoExample";
import StackOfCards from "./StackOfCards";
import SolitaireScene from "./SolitaireScene";

var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: "#05B500",
    scene: [SolitaireScene/*, StackOfCards, BouncingLogoExample*/]
};

var game = new Phaser.Game(config);

