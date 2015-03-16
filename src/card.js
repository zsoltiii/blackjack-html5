'use strict';

/**
 * A module representing a card
 * @module Card
 * @see module:Cards
 */
define('Card', ['Cards'], function(Cards) {

    /**
     * @alias module:Card
     * @param {string} suit Suit of the card
     * @param {string} rank Rank of the card
     */
    function Card (suit, rank) {

        if (!(this instanceof Card)) {
            throw new TypeError('Card constructor cannot be called as a function.');
        }

        if (Cards.suits.indexOf(suit) === -1 || Cards.ranks.indexOf(rank) === -1) {
            console.log('INVALID card');
        }

        this.suit = suit;
        this.rank = rank;

        /**
         * Resource location for image object
         * @type {string}
         */
        this.src = Cards.sprite;

        /**
         * Horizontal position of relevant rank in sprite
         * @type {number}
         */
        this.imgSpriteX = Cards.ranks.indexOf(rank);

        /**
         * Vertical position of relevant suit in sprite
         * @type {number}
         */
        this.imgSpriteY = Cards.suits.indexOf(suit);
    }

    /**
     * Card prototype
     */
    Card.prototype = {

        constructor: Card,

        /**
         * This function draws the card image from sprite
         * @param {object} ctx Canvas context
         * @param {array} pos Card position on canvas [px, px]
         */
        draw: function(ctx, pos) {
            var imageObj = new Image();
            var spriteX = this.imgSpriteX * Cards.size[0];
            var spriteY = this.imgSpriteY * Cards.size[1];

            imageObj.onload = function() {
                ctx.drawImage(
                    imageObj,
                    spriteX, spriteY,
                    Cards.size[0],
                    Cards.size[1],
                    pos[0],
                    pos[1],
                    Cards.size[0],
                    Cards.size[1]
                );
            };
            imageObj.src = this.src;
        },

        /**
         * Sets the Card object to show the back of the card
         * @see this.draw()
         */
        showBack: function() {
            this.src = Cards.backSprite;

            if (Cards.suits.indexOf(this.suit) <= 1) {
                this.imgSpriteX = 0;
            } else {
                this.imgSpriteX = 1;
            }

            this.imgSpriteY = 0;
        },

        /**
         * Sets the Card object to show the face of the card
         * @see Card#draw
         */
        showFront: function() {
            this.src = Cards.sprite;
            this.imgSpriteX = Cards.ranks.indexOf(this.rank);
            this.imgSpriteY = Cards.suits.indexOf(this.suit);
        }
    };

    return Card;
});