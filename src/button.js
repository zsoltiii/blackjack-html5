'use strict';

/**
 * A module representing a button
 * @module Button
 */
define('Button', function() {

    /**
     * @alias module:Button
     * @param {String} text Text for the button
     * @param {Number} x Horizontal position
     * @param {Number} y Vertical position
     * @param {Number} width Width of button
     * @param {Number} height Height of button
     * @param {String} fill Fill definition (colour)
     * @param {Function} callback A callback function to be run later on mouse down event
     */
    var Button = function (text, x, y, width, height, fill, callback) {

        if (!(this instanceof Button)) {
            throw new TypeError('Button constructor cannot be called as a function.');
        }

        /** @type {String} */
        this.text = text;

        /** @type {Number} */
        this.x = x;

        /** @type {Number} */
        this.y = y;

        /** @type {Number} */
        this.width = width;

        /** @type {Number} */
        this.height = height;

        /** @type {Function} */
        this.callback = callback;

        if (!fill) {
            /** @type {String} */
            this.fill = 'lightblue';
        } else {
            this.fill = fill;
        }
    };

    /**
     * Button prototype
     */
    Button.prototype = {
        /**
         * Draw button on the canvas
         * @param {Object} canvas HTML5 Canvas
         */
        draw: function(canvas) {
            var ctx = canvas.getContext('2d');

            ctx.fillStyle = this.fill;
            ctx.fillRect(this.x, this.y, this.width, this.height);

            var fontSize = this.height / 5 * 2;
            ctx.font = fontSize + 'px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(
                this.text,
                this.x + (this.width / 2) - (ctx.measureText(this.text).width / 2),
                this.y + (this.height / 2) + (fontSize / 2)
            );

            canvas.addEventListener('mousedown', this);
        },

        /**
         * Event handler for mouse click that runs the passed on callback
         * @param {Event} evt
         */
        handleEvent: function(evt) {
            if (evt.offsetX >= this.x &&
                evt.offsetX <= this.x + this.width &&
                evt.offsetY >= this.y &&
                evt.offsetY <= this.y + this.height) {
                    this.callback();
            }
        }
    };

    return Button;
});