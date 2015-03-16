'use strict';

/**
 * RequireJS configuration
 */
requirejs.config({
    baseUrl: 'src',
    paths: {
        Blackjack: 'blackjack',
        Card: 'card',
        Cards: 'cards',
        Hand: 'hand',
        Deck: 'deck',
        Button: 'button'
    }
});

/**
 * Main game module
 */
require(['Blackjack']);