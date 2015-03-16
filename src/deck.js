'use strict';

/**
 * A module representing the deck
 * @module Deck
 */
define('Deck', ['Cards', 'Card'], function(Cards, Card) {

    /**
     * @alias module:Deck
     */
    function Deck() {

        if (!(this instanceof Deck)) {
            throw new TypeError('Deck constructor cannot be called as a function.');
        }

        /**
         * Collection of cards
         * @type {Array}
         */
        var deck = [];

        Cards.suits.forEach(function(suit){
            Cards.ranks.forEach(function(rank){
                deck.push(new Card(suit, rank));
            });
        });

        /** @type {Array} */
        this.deck = deck;
    }

    /**
     * Deck prototype
     */
    Deck.prototype = {

        constructor: Deck,

        /**
         * Shuffle deck
         */
        shuffle: function() {
            this.shuffleHelper(this.deck);
        },

        /**
         * Utility method to shuffle elements of an array
         * @param o
         * @returns {*}
         * @see http://jsfromhell.com/array/shuffle
         */
        shuffleHelper: function(o){
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
            return o;
        },

        /**
         * Deal a card from deck
         * @param {Bool} showBack Show the face of the card or not
         * @returns {Card} card A card from the top of the deck
         */
        dealCard: function(showBack) {
            var card = this.deck.pop();
            if (showBack === true) {
                card.showBack();
            }
            return card;
        }
    };

    return Deck;
});