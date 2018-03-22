import * as Phaser from "phaser";

export default class SolitaireScene extends Phaser.Scene {

    constructor() {
        super({key: "SolitaireScene"});

        this.CARD_HEIGHT_PX = 190;
        this.CARD_WIDTH_PX = 140;
        this.PILE_MARGIN_X_PX = 5;
        this.PILE_MARGIN_Y_PX = this.PILE_MARGIN_X_PX * 3;
        this.TABLEAU_STACKED_OFFSET = 30;
    }

    preload() {
        this.load.atlas("cards", "assets/cards.png", "assets/cards.json");

        this.load.json("initialGameState", "/api/v1/new");

        //$.getJSON("http://localhost:8081")
    }

    create() {
        /** @type {Phaser.GameObjects.Graphics} */
        var pileOutlineStyle = this.add.graphics({
            lineStyle: {
                width: 2,
                color: Phaser.Display.Color.HexStringToColor("#d5ca28").color
            }
        });

        // Pile outlines
        this.pileOutlines = {};
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 2; j++) {
                if (i === 4 && j === 0) {
                    // Space between the foundation and deck piles
                    continue;
                }

                let pileName;
                if (j === 1) {
                    pileName = "TABLEAU_" + i;
                }
                else if (i < 4) {
                    pileName = "FOUNDATION_" + i;
                }
                else if (i === 5) {
                    pileName = "WASTE";
                }
                else {
                    pileName = "DECK";
                }

                var rect = new Phaser.Geom.Rectangle();
                rect.x = this.PILE_MARGIN_X_PX + i * (this.PILE_MARGIN_X_PX + this.CARD_WIDTH_PX);
                rect.y = this.PILE_MARGIN_X_PX + j * (this.PILE_MARGIN_Y_PX + this.CARD_HEIGHT_PX);
                rect.height = this.CARD_HEIGHT_PX;
                rect.width = this.CARD_WIDTH_PX;

                this.pileOutlines[pileName] = rect;

                pileOutlineStyle.strokeRectShape(rect);
            }
        }

        this.renderGameState(this.cache.json.get("initialGameState"));
    }

    renderGameState(gameState) {
        for (let pile of gameState.piles) {
            if (!pile.cards) {
                // The field will not be present if there are no cards in the pile
                continue;
            }
            let pileRec = this.pileOutlines[pile.pileType];

            if (pile.pileType.startsWith("TABLEAU_")) {
                let offsetIdx = 0;
                for (let card of pile.cards) {
                    let image = this.add.image(
                        pileRec.centerX, pileRec.centerY + this.TABLEAU_STACKED_OFFSET * (offsetIdx++),
                        "cards", card.faceUp ? card.suit + "_" + card.rank : "back");
                }
            }
            else {
                // Only care about the top card
                let card = pile.cards[pile.cards.length - 1];
                let image = this.add.image(
                    pileRec.centerX, pileRec.centerY,
                    "cards", card.faceUp ? card.suit + "_" + card.rank : "back");
            }
        }
    }
}
