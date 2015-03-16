'use strict';

/**
 * A module representing a hand
 * @module Hand
 */
define('Hand', ['Cards'], function (Cards) {

    /**
     * @alias module:Hand
     * @param {object} ctx Canvas context
     * @param {array} pos Card position on canvas [px, px]
     */
    function Hand (ctx, pos) {

        if (!(this instanceof Hand)) {
            throw new TypeError('Hand constructor cannot be called as a function.');
        }

        /**
         * A collection of cards
         * @type {array}
         */
        this.cards = [];

        /**
         * @type {object}
         */
        this.ctx = ctx;

        /**
         * @type {array}
         */
        this.pos = pos;

        /**
         * Visibility of hand value
         * @type {boolean}
         */
        this.valuePublic = false;
    }

    /**
     * Hand prototype
     */
    Hand.prototype = {

        /**
         * Add a card to the hand
         * @param {Card} card
         */
        addCard: function (card) {
            this.cards.push(card);
        },

        /**
         * Get the total value of the cards in hand
         * @returns {number} value
         */
        getValue: function () {
            var value = 0;

            this.cards.forEach(function(card) {
                value += Cards.values[card.rank];

                if (card.rank === 'A' && value <= 11) {
                    value += 10;
                }
            });

            return value;
        },

        /**
         * Draw all cards in hand on the canvas
         */
        draw: function () {
            var ctx = this.ctx;
            var pos = this.pos;
            this.cards.forEach(function(card, index) {
                card.draw(ctx,
                    [
                        pos[0] + index * (Cards.size[0] + 5),
                        pos[1]
                    ]
                );
            });

            this.drawValue();
        },

        /**
         * Draw hand value on the canvas
         */
        drawValue: function () {
            if (this.valuePublic === true) {
                var ctx = this.ctx;
                var pos = this.pos;
                var centerX = 60;
                var centerY = pos[1] + Cards.size[1] / 2;
                var text = this.getValue();

                ctx.beginPath();
                ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'orange';
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.stroke();

                ctx.font = '16px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(
                    text,
                    centerX - ctx.measureText(text).width / 2,
                    centerY + 6
                );
            }
        }
    };

    return Hand;
});