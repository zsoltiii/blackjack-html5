'use strict';

/**
 * Main blackjack-html5 game module
 *
 * @module Blackjack
 * @author Zsolt Szalai <a href='https://github.com/zsoltiii'>[Github]</a>
 */
define('Blackjack', ['Card', 'Hand', 'Cards', 'Deck', 'Button'], function(Card, Hand, Cards, Deck, Button) {

    /**
     * Game state
     */
    var inGame;

    /**
     * Game elements
     */
    var score, message;
    var playerHand, dealerHand, deck;

    /**
     * Buttons
     */
    var dealBtn, hitBtn, standBtn;

    /**
     * Get Canvas
     * @type {Object}
     */
    var canvas = document.getElementById('blackjackCanvas');
    canvas.width = 800;
    canvas.height = 600;

    /**
     * Get the HTML5 context object
     * @type {CanvasRenderingContext2D|*}
     */
    var ctx = canvas.getContext('2d');

    /**
     * Initialize game state and canvas buttons
     */
    var init = function() {
        score = 0;
        inGame = false;

        /**
         * Deal (New Game) button
         * @type {Button}
         */
        dealBtn = new Button('Deal', 550, 275, 150, 40, 'rgb(37, 87, 111', function(){
            return deal();
        });

        /**
         * Player: hit me with a card button
         * @type {Button}
         */
        hitBtn = new Button('Hit', 550, 320, 150, 40, 'rgb(37, 87, 111', function(){
            return hit();
        });

        /**
         * Player: stand button
         * @type {Button}
         */
        standBtn = new Button('Stand', 550, 365, 150, 40, 'rgb(37, 87, 111', function(){
            return stand();
        });
    };

    /**
     * Reset canvas elements
     */
    var reset = function () {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var blackjackText = 'B l a c k j a c k';
        ctx.fillStyle = 'orange';
        ctx.font = '52px Arial';
        ctx.fillText(blackjackText, (canvas.width - ctx.measureText(blackjackText).width) / 2, 60);

        ctx.fillStyle = 'white';
        ctx.font = '22px Arial';
        ctx.fillText('Dealer', 100, 150);
        ctx.fillText('Player', 100, 400);
        ctx.font = '18px Arial';
        ctx.fillText('[ Score: ' + score + ' ]', 170, 400);

        dealBtn.draw(canvas);
        hitBtn.draw(canvas);
        standBtn.draw(canvas);
    };

    /**
     * Run game
     */
    var run = function() {
        init();
        reset();
        deal();
    };

    /**
     * Deal action
     * @memberOf module:Blackjack
     * @see dealBtn
     */
    var deal = function() {
        if (inGame === true) {
            inGame = false;
            score--;
            deal();
            showMessage('Game restarted, you lost. Hit or stand?');
        } else {
            inGame = true;
            reset();

            deck = new Deck();
            deck.shuffle();

            dealerHand = new Hand(ctx, [100, 170]);
            dealerHand.addCard(deck.dealCard(true));
            dealerHand.addCard(deck.dealCard(false));
            dealerHand.draw();

            playerHand = new Hand(ctx, [100, 420]);
            playerHand.valuePublic = true;
            playerHand.addCard(deck.dealCard(false));
            playerHand.addCard(deck.dealCard(false));
            playerHand.draw();

            showMessage('Hit or stand?');
        }
    };

    /**
     * Hit action
     * @memberOf module:Blackjack
     * @see hitBtn
     */
    var hit = function() {
        if (inGame === true) {
            if (playerHand.getValue() <= 21) {
                playerHand.addCard(deck.dealCard(false));
                playerHand.draw();

                if (playerHand.getValue() > 21) {
                    inGame = false;
                    score--;
                    message = 'You have busted. New deal?';
                } else {
                    message = 'Hit or stand?';
                }
                showMessage(message);
            }
        }
    };

    /**
     * Stand action
     * @memberOf module:Blackjack
     * @see standBtn
     */
    var stand = function() {
        if (inGame === true) {
            while(dealerHand.getValue() < 17) {
                dealerHand.valuePublic = true;
                dealerHand.addCard(deck.dealCard(false));
                dealerHand.draw();
            }

            inGame = false;
            if (dealerHand.cards[0] instanceof Card) {
                dealerHand.cards[0].showFront();
                dealerHand.draw();
            }

            if (dealerHand.getValue() > 21) {
                message = 'Dealer has busted. You win!';
                score++;
            } else if (dealerHand.getValue() >= playerHand.getValue()) {
                message = 'Dealer beat you!';
                score--;
            } else {
                message = 'You won!';
                score++;
            }
            showMessage(message);
        }
    };

    /**
     * Update on screen message
     * @param text
     */
    var showMessage = function(text) {
        ctx.fillStyle = 'green';
        ctx.fillRect(100, 270, 400, 100);

        ctx.fillStyle = 'orange';
        ctx.font = '20px Arial';
        ctx.fillText(text, 130, 330);
    };

    run();
});



