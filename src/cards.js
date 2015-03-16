'use strict';

/**
 * A module that contains Cards definitions
 * @module Cards
 * @see module:Card
 */
define('Cards', function() {

    /**
     * @alias module:Cards
     */
    function Cards() {}

    /**
     * Available suits
     * @static
     * @type {string[]}
     */
    Cards.suits = ['C', 'S', 'H', 'D'];

    /**
     * Available ranks
     * @static
     * @type {string[]}
     */
    Cards.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

    /**
     * Card values in blackjack
     * @static
     * @type {number}
     */
    Cards.values = {'A':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, 'T':10, 'J':10, 'Q':10, 'K':10};

    /**
     * Sprite containing the face of cards
     * @static
     * @type {string}
     */
    Cards.sprite = 'src/images/cards_jfitz.png';

    /**
     * Sprite containing the back of cards
     * @static
     * @type {string}
     */
    Cards.backSprite = 'src/images/card_jfitz_back.png';

    /**
     * Size of a card
     * @static
     * @type {number[]}
     */
    Cards.size = [72, 96];

    /**
     * Center point of card image
     * @static
     * @type {number[]}
     */
    Cards.center = [36, 48];

    return Cards;
});